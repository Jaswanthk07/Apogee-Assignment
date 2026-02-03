import Task from '../models/Task.js';

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, type, sortBy } = req.query;

    const query = { userId: req.user.id };

    if (status && status !== 'all') query.status = status;
    if (priority && priority !== 'all') query.priority = priority;
    if (type && type !== 'all') query.type = type;

    let sortOption = {};
    if (sortBy === 'dueDate') sortOption = { dueDate: 1 };
    else if (sortBy === 'priority') {
      const priorityOrder = { urgent: 1, high: 2, medium: 3, low: 4 };
      sortOption = { priority: 1 };
    } else if (sortBy === 'createdAt') sortOption = { createdAt: -1 };
    else sortOption = { dueDate: 1 };

    const tasks = await Task.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Make sure user owns task
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task',
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Make sure user owns task
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Make sure user owns task
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk sync tasks (for offline sync)
// @route   POST /api/tasks/sync
// @access  Private
export const syncTasks = async (req, res, next) => {
  try {
    const { tasks: clientTasks } = req.body;

    if (!Array.isArray(clientTasks)) {
      return res.status(400).json({
        success: false,
        message: 'Tasks must be an array',
      });
    }

    const syncedTasks = [];
    const conflicts = [];

    for (const clientTask of clientTasks) {
      try {
        // Check if task exists on server
        const serverTask = await Task.findOne({
          _id: clientTask.id,
          userId: req.user.id,
        });

        if (!serverTask) {
          // Create new task
          const newTask = await Task.create({
            ...clientTask,
            userId: req.user.id,
            syncStatus: 'synced',
            lastSyncedAt: new Date(),
          });
          syncedTasks.push(newTask);
        } else {
          // Check for conflicts (server updated after client)
          const clientUpdated = new Date(clientTask.updatedAt);
          const serverUpdated = new Date(serverTask.updatedAt);

          if (serverUpdated > clientUpdated) {
            conflicts.push({
              taskId: serverTask._id,
              serverVersion: serverTask,
              clientVersion: clientTask,
            });
          } else {
            // Update with client version
            const updated = await Task.findByIdAndUpdate(
              serverTask._id,
              {
                ...clientTask,
                syncStatus: 'synced',
                lastSyncedAt: new Date(),
              },
              { new: true, runValidators: true }
            );
            syncedTasks.push(updated);
          }
        }
      } catch (error) {
        console.error('Sync error for task:', clientTask.id, error);
      }
    }

    // Get all server tasks for this user
    const allServerTasks = await Task.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      syncedTasks,
      conflicts,
      serverTasks: allServerTasks,
    });
  } catch (error) {
    next(error);
  }
};

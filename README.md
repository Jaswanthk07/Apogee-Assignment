<div align="center">

# 📋 Action Items Manager

### A Task Management Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.3-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-7.x-47A248.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/express-4.x-000000.svg)](https://expressjs.com/)

**A task management web application for managing reminders, emails, calendar invites, and general tasks with priority levels, due dates, and offline support.**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API](#-api-documentation) • [Contributing](#-contributing)

---

</div>

## 🎯 Overview

Action Items Manager is a production-ready, full-stack task management application that helps you organize and track your action items efficiently. Built with modern web technologies, it offers a seamless experience both online and offline.

### Why Action Items Manager?

- 🚀 **Fast & Responsive** - Built with Vite and React for lightning-fast performance
- 📱 **Works Everywhere** - Fully responsive design for desktop, tablet, and mobile
- 🔄 **Offline-First** - Continue working without internet, auto-sync when back online
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- 🔒 **Secure** - JWT authentication with encrypted passwords
- ⚡ **Real-time Updates** - Instant UI feedback with optimistic updates

## ✨ Features

### 🔐 **Authentication & Security**
- User registration and login with JWT tokens
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Session persistence with localStorage
- Profile management

### 📝 **Task Management**
- Create, read, update, and delete tasks
- **Task Types**: Reminder, Email, Calendar Invite
- **Priority Levels**: Low, Medium, High, Urgent
- **Status Tracking**: Todo, In Progress, Completed
- Due date management with visual indicators
- Rich text descriptions

### 🔍 **Organization & Discovery**
- Advanced filtering by status, priority, and type
- Real-time search functionality
- Sort by due date, priority, or creation date
- Quick status toggle (complete/incomplete)
- Dashboard with statistics and insights

### 📴 **Offline Capabilities**
- Full offline support with IndexedDB
- Automatic synchronization when reconnected
- Conflict resolution (server version wins)
- Optimistic UI updates
- Sync status indicators

### 🎨 **User Experience**
- Modern glassmorphism UI design
- Smooth animations with Framer Motion
- Dark mode support
- Toast notifications for feedback
- Loading states and skeletons
- Responsive design (mobile-first)
- Empty states with helpful messages

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ⚛️ **React 18** | UI library with TypeScript |
| ⚡ **Vite** | Next-generation build tool |
| 🎨 **Tailwind CSS** | Utility-first CSS framework |
| 🧩 **shadcn/ui** | High-quality component library |
| 🎭 **Framer Motion** | Production-ready animations |
| 🔄 **React Query** | Data fetching and caching |
| 📝 **React Hook Form** | Performant form handling |
| ✅ **Zod** | TypeScript-first schema validation |
| 🌐 **Axios** | Promise-based HTTP client |
| 🛣️ **React Router v6** | Client-side routing |
| 💾 **Dexie.js** | IndexedDB wrapper for offline storage |

### Backend
| Technology | Purpose |
|------------|---------|
| 🟢 **Node.js** | JavaScript runtime |
| 🚂 **Express.js** | Fast web framework |
| 🍃 **MongoDB** | NoSQL database |
| 📊 **Mongoose** | MongoDB ODM |
| 🔑 **JWT** | Secure authentication |
| 🔐 **bcrypt** | Password hashing |
| 🌐 **CORS** | Cross-origin resource sharing |
| 🔄 **Nodemon** | Auto-restart during development |

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Local Installation](https://www.mongodb.com/docs/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)
- **npm** or **yarn** (comes with Node.js)

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/action-items-manager.git
cd action-items-manager
```

#### 2️⃣ Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

#### 3️⃣ Configure Environment Variables

**Frontend Configuration** (`.env`):

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend Configuration** (`server/.env`):

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/action-items-manager
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/action-items-manager

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Important**: Change `JWT_SECRET` to a strong, random string in production!

#### 4️⃣ Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in `server/.env`

#### 5️⃣ Run the Application

**Option 1: Using Startup Scripts (Recommended)**

**Windows:**
```bash
start-dev.bat
```

**macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Option 2: Manual Startup**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

#### 6️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

🎉 **Congratulations!** Your Action Items Manager is now running!

## 📁 Project Structure

```
action-items-manager/
│
├── 📂 src/                           # Frontend source code
│   ├── 📂 api/                       # API client & interceptors
│   │   ├── client.ts                 # Axios instance configuration
│   │   ├── auth.ts                   # Auth API calls
│   │   └── tasks.ts                  # Task API calls
│   │
│   ├── 📂 components/                # React components
│   │   ├── 📂 ui/                    # shadcn/ui components
│   │   ├── 📂 layout/                # Layout components (Navbar, Sidebar)
│   │   ├── 📂 tasks/                 # Task-specific components
│   │   └── 📂 auth/                  # Auth components
│   │
│   ├── 📂 hooks/                     # Custom React hooks
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useTasks.ts               # Task management hook
│   │   └── useOffline.ts             # Offline detection hook
│   │
│   ├── 📂 lib/                       # Utilities & helpers
│   │   ├── db.ts                     # IndexedDB configuration
│   │   ├── types.ts                  # TypeScript types
│   │   └── utils.ts                  # Helper functions
│   │
│   ├── 📂 pages/                     # Page components
│   │   ├── Login.tsx                 # Login page
│   │   ├── Register.tsx              # Registration page
│   │   ├── Dashboard.tsx             # Dashboard with stats
│   │   ├── Tasks.tsx                 # Task management page
│   │   ├── Calendar.tsx              # Calendar view
│   │   └── Settings.tsx              # User settings
│   │
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
│
├── 📂 server/                        # Backend source code
│   └── 📂 src/
│       ├── 📂 config/                # Configuration
│       │   └── database.js           # MongoDB connection
│       │
│       ├── 📂 controllers/           # Business logic
│       │   ├── authController.js     # Auth operations
│       │   └── taskController.js     # Task CRUD operations
│       │
│       ├── 📂 middleware/            # Express middleware
│       │   ├── auth.js               # JWT verification
│       │   └── errorHandler.js       # Global error handler
│       │
│       ├── 📂 models/                # Mongoose schemas
│       │   ├── User.js               # User model
│       │   └── Task.js               # Task model
│       │
│       ├── 📂 routes/                # API routes
│       │   ├── authRoutes.js         # Auth endpoints
│       │   └── taskRoutes.js         # Task endpoints
│       │
│       ├── 📂 utils/                 # Utilities
│       │   └── jwt.js                # JWT helpers
│       │
│       └── index.js                  # Server entry point
│
├── 📂 public/                        # Static assets
├── 📂 docs/                          # Additional documentation
│   ├── QUICK_START.md                # Quick start guide
│   ├── SETUP_GUIDE.md                # Detailed setup
│   ├── FEATURES.md                   # Feature documentation
│   └── PROJECT_STRUCTURE.md          # Architecture guide
│
├── 📄 .env.example                   # Frontend env template
├── 📄 package.json                   # Frontend dependencies
├── 📄 tsconfig.json                  # TypeScript config
├── 📄 tailwind.config.js             # Tailwind configuration
├── 📄 vite.config.ts                 # Vite configuration
└── 📄 README.md                      # This file
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatarUrl": "https://example.com/avatar.jpg"
  }
}
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Smith",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Complete project proposal",
      "description": "Draft and submit Q4 proposal",
      "priority": "high",
      "status": "in-progress",
      "type": "reminder",
      "dueDate": "2024-02-20T00:00:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T14:20:00.000Z"
    }
  ]
}
```

#### Create Task
```http
POST /tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Send follow-up email",
  "description": "Follow up with client about meeting",
  "priority": "medium",
  "status": "todo",
  "type": "email",
  "dueDate": "2024-02-18T00:00:00.000Z"
}
```

**Response (201 Created):**
```json
{
  "task": {
    "id": "507f1f77bcf86cd799439013",
    "title": "Send follow-up email",
    "description": "Follow up with client about meeting",
    "priority": "medium",
    "status": "todo",
    "type": "email",
    "dueDate": "2024-02-18T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-17T09:15:00.000Z",
    "updatedAt": "2024-01-17T09:15:00.000Z"
  }
}
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "completed",
  "priority": "low"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

#### Bulk Sync (for Offline Support)
```http
POST /tasks/sync
Authorization: Bearer {token}
Content-Type: application/json

{
  "tasks": [
    {
      "id": "temp-123",
      "title": "New offline task",
      "priority": "medium",
      "status": "todo",
      "type": "reminder"
    }
  ]
}
```

### API Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🗄️ Database Schema

### User Collection

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    // Hashed with bcrypt (10 rounds)
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `email` (unique)

### Task Collection

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo'
  },
  type: {
    type: String,
    enum: ['reminder', 'email', 'calendar'],
    required: true
  },
  dueDate: {
    type: Date,
    default: null
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  syncStatus: {
    type: String,
    enum: ['synced', 'pending', 'conflict'],
    default: 'synced'
  },
  lastSyncedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `userId` (for efficient user queries)
- `userId, status` (compound index for filtering)
- `userId, dueDate` (compound index for sorting)

## 🔒 Security Features

### Authentication & Authorization
- ✅ JWT-based authentication with HttpOnly cookies option
- ✅ Password hashing using bcrypt (10 salt rounds)
- ✅ Protected API routes with middleware verification
- ✅ Token expiration and refresh logic
- ✅ Secure password requirements enforcement

### Data Protection
- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention (NoSQL via Mongoose)
- ✅ XSS protection with proper escaping
- ✅ CORS configuration for allowed origins
- ✅ Rate limiting ready (implementation recommended)

### Best Practices
- ✅ Environment variables for sensitive data
- ✅ No sensitive data in client-side storage
- ✅ Secure HTTP headers (Helmet.js recommended)
- ✅ Error messages don't leak sensitive info

## 📴 Offline Functionality

### How It Works

The application uses **IndexedDB** (via Dexie.js) to provide full offline support:

1. **Initial Sync**: On first login, all tasks are cached locally
2. **Offline Mode**: When disconnected, all operations work against local cache
3. **Local Queue**: Changes made offline are queued for sync
4. **Auto-Sync**: When reconnected, changes automatically sync to server
5. **Conflict Resolution**: Server version takes precedence in conflicts

### Offline Capabilities

✅ View all tasks
✅ Create new tasks
✅ Update existing tasks
✅ Delete tasks
✅ Filter and search
✅ Sort tasks
✅ Mark complete/incomplete

### Sync Indicators

- 🟢 **Synced** - All changes saved to server
- 🟡 **Pending** - Changes waiting to sync
- 🔴 **Offline** - No connection, working locally
- ⚠️ **Conflict** - Server version differs from local

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Carefully chosen colors for priority levels
  - 🔵 Low Priority (Blue)
  - 🟡 Medium Priority (Yellow)
  - 🟠 High Priority (Orange)
  - 🔴 Urgent Priority (Red)
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation for depth

### Animations
- Smooth page transitions
- Card hover effects
- Loading skeletons
- Toast notifications slide-in
- Modal fade-in/out
- Button press feedback

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators
- Color contrast compliance (WCAG AA)
- Semantic HTML structure

## 🚀 Building for Production

### Frontend Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build artifacts will be in the `dist/` directory.

### Backend Production

```bash
cd server

# Install production dependencies only
npm install --production

# Start server
npm start
```

### Environment Variables for Production

**Frontend:**
```env
VITE_API_URL=https://your-api-domain.com/api
```

**Backend:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/production-db
JWT_SECRET=your-very-strong-production-secret-key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

### Deployment Options

#### Frontend
- **Vercel** (Recommended) - Zero config deployment
- **Netlify** - Great for static sites
- **AWS S3 + CloudFront** - Scalable and fast
- **GitHub Pages** - Free for public repos

#### Backend
- **Heroku** - Easy deployment with free tier
- **DigitalOcean App Platform** - Simple and affordable
- **AWS EC2** - Full control and scalability
- **Railway** - Modern platform with free tier

#### Database
- **MongoDB Atlas** (Recommended) - Managed MongoDB service
- **Self-hosted** - Full control but requires management

### Production Checklist

- [ ] Update all environment variables
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Add monitoring (e.g., Sentry, LogRocket)
- [ ] Optimize images and assets
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure proper caching headers
- [ ] Test offline functionality
- [ ] Perform security audit

## 🧪 Testing

### Run Tests

```bash
# Frontend tests
npm test

# Backend tests
cd server && npm test

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Test Structure

```
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── integration/
```

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint
npm run type-check   # TypeScript type checking
npm test             # Run tests
```

**Backend:**
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run lint         # Lint code
npm test             # Run tests
```

### Code Style

This project follows industry best practices:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Conventional Commits** - Commit message format

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/action-items-manager.git`
3. Create a branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Test your changes
6. Commit: `git commit -m 'feat: add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Pull Request Guidelines

- ✅ Follow the code style (ESLint + Prettier)
- ✅ Add tests for new features
- ✅ Update documentation
- ✅ Ensure all tests pass
- ✅ Keep PRs focused and atomic
- ✅ Write clear commit messages
- ✅ Update the CHANGELOG (if applicable)

### Development Setup

See [Quick Start](#-quick-start) section for development environment setup.

### Reporting Bugs

Found a bug? Please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

### Feature Requests

Have an idea? Open an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach

## 📋 Roadmap

### Version 1.1 (Q2 2024)
- [ ] Email notifications for due tasks
- [ ] Task comments and activity log
- [ ] File attachments support
- [ ] Advanced search with filters
- [ ] Bulk task operations

### Version 1.2 (Q3 2024)
- [ ] Team workspaces
- [ ] Task sharing and collaboration
- [ ] Real-time updates with WebSockets
- [ ] Task templates
- [ ] Custom task fields

### Version 2.0 (Q4 2024)
- [ ] Calendar integration (Google, Outlook)
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics and reports
- [ ] AI-powered task suggestions
- [ ] Integration with third-party tools (Slack, Trello)

### Future Considerations
- [ ] Recurring tasks
- [ ] Subtasks and dependencies
- [ ] Time tracking
- [ ] Gantt chart view
- [ ] API rate limiting
- [ ] Multi-language support
- [ ] Two-factor authentication

## 📊 Performance Metrics

- ⚡ **Build Time**: < 3 seconds (Vite)
- 📦 **Bundle Size**: ~150KB gzipped
- 🚀 **First Paint**: < 1 second
- ⏱️ **API Response**: < 100ms average
- 💾 **Offline Storage**: ~50MB quota

## 📚 Documentation

- [Quick Start Guide](docs/QUICK_START.md)
- [Detailed Setup Guide](docs/SETUP_GUIDE.md)
- [Features Documentation](docs/FEATURES.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [API Reference](docs/API.md)
- [Contributing Guide](CONTRIBUTING.md)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👥 Authors & Contributors

### Core Team
- **Your Name** - *Creator & Lead Developer* - [@yourusername](https://github.com/yourusername)

### Contributors
Thanks to all contributors who have helped improve this project!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Add contributors here -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## 🙏 Acknowledgments

This project was built with the help of these amazing technologies and resources:

- [React](https://reactjs.org/) - The UI library that powers the frontend
- [Vite](https://vitejs.dev/) - The blazing fast build tool
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animations
- [MongoDB](https://www.mongodb.com/) - The document database
- [Express.js](https://expressjs.com/) - Fast, minimalist web framework
- [Dexie.js](https://dexie.org/) - IndexedDB wrapper for offline storage

Special thanks to the open-source community for their continuous support and contributions.

## 📞 Support & Contact

### Get Help

- 📧 **Email**: your.email@example.com
- 💬 **Discord**: [Join our community](https://discord.gg/yourserver)
- 🐦 **Twitter**: [@yourusername](https://twitter.com/yourusername)
- 📝 **Blog**: [Your Blog](https://yourblog.com)

### Report Issues

Found a bug or have a feature request? 

- [Report a Bug](https://github.com/yourusername/action-items-manager/issues/new?template=bug_report.md)
- [Request a Feature](https://github.com/yourusername/action-items-manager/issues/new?template=feature_request.md)

### Commercial Support

For commercial support, custom development, or consulting:
- Email: business@example.com
- Website: https://yourwebsite.com

## ⭐ Show Your Support

If you found this project helpful, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs
- 💡 **Suggesting** new features
- 🔀 **Contributing** code
- 📢 **Sharing** with others

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/action-items-manager?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/action-items-manager?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/action-items-manager)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/action-items-manager)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/action-items-manager)

---

<div align="center">

### 🚀 Ready to get started?

[Quick Start](#-quick-start) • [View Demo](#) • [Read Docs](#-documentation)

**Made with ❤️ by developers, for developers**

⭐ **Star this repo** if you find it helpful!

---

**[⬆ back to top](#-action-items-manager)**

</div><div align="center">

# 📋 Action Items Manager

### A Modern Full-Stack Task Management Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.3-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-7.x-47A248.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/express-4.x-000000.svg)](https://expressjs.com/)

**A fully functional task management web application for managing reminders, emails, calendar invites, and general tasks with priority levels, due dates, and offline support.**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API](#-api-documentation) • [Contributing](#-contributing)

---

</div>

## 🎯 Overview

Action Items Manager is a production-ready, full-stack task management application that helps you organize and track your action items efficiently. Built with modern web technologies, it offers a seamless experience both online and offline.

### Why Action Items Manager?

- 🚀 **Fast & Responsive** - Built with Vite and React for lightning-fast performance
- 📱 **Works Everywhere** - Fully responsive design for desktop, tablet, and mobile
- 🔄 **Offline-First** - Continue working without internet, auto-sync when back online
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- 🔒 **Secure** - JWT authentication with encrypted passwords
- ⚡ **Real-time Updates** - Instant UI feedback with optimistic updates

## ✨ Features

### 🔐 **Authentication & Security**
- User registration and login with JWT tokens
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Session persistence with localStorage
- Profile management

### 📝 **Task Management**
- Create, read, update, and delete tasks
- **Task Types**: Reminder, Email, Calendar Invite
- **Priority Levels**: Low, Medium, High, Urgent
- **Status Tracking**: Todo, In Progress, Completed
- Due date management with visual indicators
- Rich text descriptions

### 🔍 **Organization & Discovery**
- Advanced filtering by status, priority, and type
- Real-time search functionality
- Sort by due date, priority, or creation date
- Quick status toggle (complete/incomplete)
- Dashboard with statistics and insights

### 📴 **Offline Capabilities**
- Full offline support with IndexedDB
- Automatic synchronization when reconnected
- Conflict resolution (server version wins)
- Optimistic UI updates
- Sync status indicators

### 🎨 **User Experience**
- Modern glassmorphism UI design
- Smooth animations with Framer Motion
- Dark mode support
- Toast notifications for feedback
- Loading states and skeletons
- Responsive design (mobile-first)
- Empty states with helpful messages

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ⚛️ **React 18** | UI library with TypeScript |
| ⚡ **Vite** | Next-generation build tool |
| 🎨 **Tailwind CSS** | Utility-first CSS framework |
| 🧩 **shadcn/ui** | High-quality component library |
| 🎭 **Framer Motion** | Production-ready animations |
| 🔄 **React Query** | Data fetching and caching |
| 📝 **React Hook Form** | Performant form handling |
| ✅ **Zod** | TypeScript-first schema validation |
| 🌐 **Axios** | Promise-based HTTP client |
| 🛣️ **React Router v6** | Client-side routing |
| 💾 **Dexie.js** | IndexedDB wrapper for offline storage |

### Backend
| Technology | Purpose |
|------------|---------|
| 🟢 **Node.js** | JavaScript runtime |
| 🚂 **Express.js** | Fast web framework |
| 🍃 **MongoDB** | NoSQL database |
| 📊 **Mongoose** | MongoDB ODM |
| 🔑 **JWT** | Secure authentication |
| 🔐 **bcrypt** | Password hashing |
| 🌐 **CORS** | Cross-origin resource sharing |
| 🔄 **Nodemon** | Auto-restart during development |

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Local Installation](https://www.mongodb.com/docs/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)
- **npm** or **yarn** (comes with Node.js)

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/action-items-manager.git
cd action-items-manager
```

#### 2️⃣ Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

#### 3️⃣ Configure Environment Variables

**Frontend Configuration** (`.env`):

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend Configuration** (`server/.env`):

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/action-items-manager
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/action-items-manager

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Important**: Change `JWT_SECRET` to a strong, random string in production!

#### 4️⃣ Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in `server/.env`

#### 5️⃣ Run the Application

**Option 1: Using Startup Scripts (Recommended)**

**Windows:**
```bash
start-dev.bat
```

**macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Option 2: Manual Startup**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

#### 6️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

🎉 **Congratulations!** Your Action Items Manager is now running!

## 📁 Project Structure

```
action-items-manager/
│
├── 📂 src/                           # Frontend source code
│   ├── 📂 api/                       # API client & interceptors
│   │   ├── client.ts                 # Axios instance configuration
│   │   ├── auth.ts                   # Auth API calls
│   │   └── tasks.ts                  # Task API calls
│   │
│   ├── 📂 components/                # React components
│   │   ├── 📂 ui/                    # shadcn/ui components
│   │   ├── 📂 layout/                # Layout components (Navbar, Sidebar)
│   │   ├── 📂 tasks/                 # Task-specific components
│   │   └── 📂 auth/                  # Auth components
│   │
│   ├── 📂 hooks/                     # Custom React hooks
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useTasks.ts               # Task management hook
│   │   └── useOffline.ts             # Offline detection hook
│   │
│   ├── 📂 lib/                       # Utilities & helpers
│   │   ├── db.ts                     # IndexedDB configuration
│   │   ├── types.ts                  # TypeScript types
│   │   └── utils.ts                  # Helper functions
│   │
│   ├── 📂 pages/                     # Page components
│   │   ├── Login.tsx                 # Login page
│   │   ├── Register.tsx              # Registration page
│   │   ├── Dashboard.tsx             # Dashboard with stats
│   │   ├── Tasks.tsx                 # Task management page
│   │   ├── Calendar.tsx              # Calendar view
│   │   └── Settings.tsx              # User settings
│   │
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
│
├── 📂 server/                        # Backend source code
│   └── 📂 src/
│       ├── 📂 config/                # Configuration
│       │   └── database.js           # MongoDB connection
│       │
│       ├── 📂 controllers/           # Business logic
│       │   ├── authController.js     # Auth operations
│       │   └── taskController.js     # Task CRUD operations
│       │
│       ├── 📂 middleware/            # Express middleware
│       │   ├── auth.js               # JWT verification
│       │   └── errorHandler.js       # Global error handler
│       │
│       ├── 📂 models/                # Mongoose schemas
│       │   ├── User.js               # User model
│       │   └── Task.js               # Task model
│       │
│       ├── 📂 routes/                # API routes
│       │   ├── authRoutes.js         # Auth endpoints
│       │   └── taskRoutes.js         # Task endpoints
│       │
│       ├── 📂 utils/                 # Utilities
│       │   └── jwt.js                # JWT helpers
│       │
│       └── index.js                  # Server entry point
│
├── 📂 public/                        # Static assets
├── 📂 docs/                          # Additional documentation
│   ├── QUICK_START.md                # Quick start guide
│   ├── SETUP_GUIDE.md                # Detailed setup
│   ├── FEATURES.md                   # Feature documentation
│   └── PROJECT_STRUCTURE.md          # Architecture guide
│
├── 📄 .env.example                   # Frontend env template
├── 📄 package.json                   # Frontend dependencies
├── 📄 tsconfig.json                  # TypeScript config
├── 📄 tailwind.config.js             # Tailwind configuration
├── 📄 vite.config.ts                 # Vite configuration
└── 📄 README.md                      # This file
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatarUrl": "https://example.com/avatar.jpg"
  }
}
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Smith",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Complete project proposal",
      "description": "Draft and submit Q4 proposal",
      "priority": "high",
      "status": "in-progress",
      "type": "reminder",
      "dueDate": "2024-02-20T00:00:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T14:20:00.000Z"
    }
  ]
}
```

#### Create Task
```http
POST /tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Send follow-up email",
  "description": "Follow up with client about meeting",
  "priority": "medium",
  "status": "todo",
  "type": "email",
  "dueDate": "2024-02-18T00:00:00.000Z"
}
```

**Response (201 Created):**
```json
{
  "task": {
    "id": "507f1f77bcf86cd799439013",
    "title": "Send follow-up email",
    "description": "Follow up with client about meeting",
    "priority": "medium",
    "status": "todo",
    "type": "email",
    "dueDate": "2024-02-18T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-17T09:15:00.000Z",
    "updatedAt": "2024-01-17T09:15:00.000Z"
  }
}
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "completed",
  "priority": "low"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

#### Bulk Sync (for Offline Support)
```http
POST /tasks/sync
Authorization: Bearer {token}
Content-Type: application/json

{
  "tasks": [
    {
      "id": "temp-123",
      "title": "New offline task",
      "priority": "medium",
      "status": "todo",
      "type": "reminder"
    }
  ]
}
```

### API Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🗄️ Database Schema

### User Collection

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    // Hashed with bcrypt (10 rounds)
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `email` (unique)

### Task Collection

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo'
  },
  type: {
    type: String,
    enum: ['reminder', 'email', 'calendar'],
    required: true
  },
  dueDate: {
    type: Date,
    default: null
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  syncStatus: {
    type: String,
    enum: ['synced', 'pending', 'conflict'],
    default: 'synced'
  },
  lastSyncedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `userId` (for efficient user queries)
- `userId, status` (compound index for filtering)
- `userId, dueDate` (compound index for sorting)

## 🔒 Security Features

### Authentication & Authorization
- ✅ JWT-based authentication with HttpOnly cookies option
- ✅ Password hashing using bcrypt (10 salt rounds)
- ✅ Protected API routes with middleware verification
- ✅ Token expiration and refresh logic
- ✅ Secure password requirements enforcement

### Data Protection
- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention (NoSQL via Mongoose)
- ✅ XSS protection with proper escaping
- ✅ CORS configuration for allowed origins
- ✅ Rate limiting ready (implementation recommended)

### Best Practices
- ✅ Environment variables for sensitive data
- ✅ No sensitive data in client-side storage
- ✅ Secure HTTP headers (Helmet.js recommended)
- ✅ Error messages don't leak sensitive info

## 📴 Offline Functionality

### How It Works

The application uses **IndexedDB** (via Dexie.js) to provide full offline support:

1. **Initial Sync**: On first login, all tasks are cached locally
2. **Offline Mode**: When disconnected, all operations work against local cache
3. **Local Queue**: Changes made offline are queued for sync
4. **Auto-Sync**: When reconnected, changes automatically sync to server
5. **Conflict Resolution**: Server version takes precedence in conflicts

### Offline Capabilities

✅ View all tasks
✅ Create new tasks
✅ Update existing tasks
✅ Delete tasks
✅ Filter and search
✅ Sort tasks
✅ Mark complete/incomplete

### Sync Indicators

- 🟢 **Synced** - All changes saved to server
- 🟡 **Pending** - Changes waiting to sync
- 🔴 **Offline** - No connection, working locally
- ⚠️ **Conflict** - Server version differs from local

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Carefully chosen colors for priority levels
  - 🔵 Low Priority (Blue)
  - 🟡 Medium Priority (Yellow)
  - 🟠 High Priority (Orange)
  - 🔴 Urgent Priority (Red)
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation for depth

### Animations
- Smooth page transitions
- Card hover effects
- Loading skeletons
- Toast notifications slide-in
- Modal fade-in/out
- Button press feedback

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators
- Color contrast compliance (WCAG AA)
- Semantic HTML structure

## 🚀 Building for Production

### Frontend Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build artifacts will be in the `dist/` directory.

### Backend Production

```bash
cd server

# Install production dependencies only
npm install --production

# Start server
npm start
```

### Environment Variables for Production

**Frontend:**
```env
VITE_API_URL=https://your-api-domain.com/api
```

**Backend:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/production-db
JWT_SECRET=your-very-strong-production-secret-key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

### Deployment Options

#### Frontend
- **Vercel** (Recommended) - Zero config deployment
- **Netlify** - Great for static sites
- **AWS S3 + CloudFront** - Scalable and fast
- **GitHub Pages** - Free for public repos

#### Backend
- **Heroku** - Easy deployment with free tier
- **DigitalOcean App Platform** - Simple and affordable
- **AWS EC2** - Full control and scalability
- **Railway** - Modern platform with free tier

#### Database
- **MongoDB Atlas** (Recommended) - Managed MongoDB service
- **Self-hosted** - Full control but requires management

### Production Checklist

- [ ] Update all environment variables
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Add monitoring (e.g., Sentry, LogRocket)
- [ ] Optimize images and assets
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure proper caching headers
- [ ] Test offline functionality
- [ ] Perform security audit

## 🧪 Testing

### Run Tests

```bash
# Frontend tests
npm test

# Backend tests
cd server && npm test

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Test Structure

```
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── integration/
```

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code with ESLint
npm run type-check   # TypeScript type checking
npm test             # Run tests
```

**Backend:**
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run lint         # Lint code
npm test             # Run tests
```

### Code Style

This project follows industry best practices:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Conventional Commits** - Commit message format

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/action-items-manager.git`
3. Create a branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Test your changes
6. Commit: `git commit -m 'feat: add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Pull Request Guidelines

- ✅ Follow the code style (ESLint + Prettier)
- ✅ Add tests for new features
- ✅ Update documentation
- ✅ Ensure all tests pass
- ✅ Keep PRs focused and atomic
- ✅ Write clear commit messages
- ✅ Update the CHANGELOG (if applicable)

### Development Setup

See [Quick Start](#-quick-start) section for development environment setup.

### Reporting Bugs

Found a bug? Please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

### Feature Requests

Have an idea? Open an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach

## 📋 Roadmap

### Version 1.1 (Q2 2024)
- [ ] Email notifications for due tasks
- [ ] Task comments and activity log
- [ ] File attachments support
- [ ] Advanced search with filters
- [ ] Bulk task operations

### Version 1.2 (Q3 2024)
- [ ] Team workspaces
- [ ] Task sharing and collaboration
- [ ] Real-time updates with WebSockets
- [ ] Task templates
- [ ] Custom task fields

### Version 2.0 (Q4 2024)
- [ ] Calendar integration (Google, Outlook)
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics and reports
- [ ] AI-powered task suggestions
- [ ] Integration with third-party tools (Slack, Trello)

### Future Considerations
- [ ] Recurring tasks
- [ ] Subtasks and dependencies
- [ ] Time tracking
- [ ] Gantt chart view
- [ ] API rate limiting
- [ ] Multi-language support
- [ ] Two-factor authentication

## 📊 Performance Metrics

- ⚡ **Build Time**: < 3 seconds (Vite)
- 📦 **Bundle Size**: ~150KB gzipped
- 🚀 **First Paint**: < 1 second
- ⏱️ **API Response**: < 100ms average
- 💾 **Offline Storage**: ~50MB quota

## 📚 Documentation

- [Quick Start Guide](docs/QUICK_START.md)
- [Detailed Setup Guide](docs/SETUP_GUIDE.md)
- [Features Documentation](docs/FEATURES.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [API Reference](docs/API.md)
- [Contributing Guide](CONTRIBUTING.md)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👥 Authors & Contributors

### Core Team
- **Your Name** - *Creator & Lead Developer* - [@yourusername](https://github.com/yourusername)

### Contributors
Thanks to all contributors who have helped improve this project!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Add contributors here -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## 🙏 Acknowledgments

This project was built with the help of these amazing technologies and resources:

- [React](https://reactjs.org/) - The UI library that powers the frontend
- [Vite](https://vitejs.dev/) - The blazing fast build tool
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animations
- [MongoDB](https://www.mongodb.com/) - The document database
- [Express.js](https://expressjs.com/) - Fast, minimalist web framework
- [Dexie.js](https://dexie.org/) - IndexedDB wrapper for offline storage

Special thanks to the open-source community for their continuous support and contributions.

## 📞 Support & Contact

### Get Help

- 📧 **Email**: your.email@example.com
- 💬 **Discord**: [Join our community](https://discord.gg/yourserver)
- 🐦 **Twitter**: [@yourusername](https://twitter.com/yourusername)
- 📝 **Blog**: [Your Blog](https://yourblog.com)

### Report Issues

Found a bug or have a feature request? 

- [Report a Bug](https://github.com/yourusername/action-items-manager/issues/new?template=bug_report.md)
- [Request a Feature](https://github.com/yourusername/action-items-manager/issues/new?template=feature_request.md)

### Commercial Support

For commercial support, custom development, or consulting:
- Email: business@example.com
- Website: https://yourwebsite.com

## ⭐ Show Your Support

If you found this project helpful, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs
- 💡 **Suggesting** new features
- 🔀 **Contributing** code
- 📢 **Sharing** with others

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/action-items-manager?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/action-items-manager?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/action-items-manager)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/action-items-manager)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/action-items-manager)

---

<div align="center">

### 🚀 Ready to get started?

[Quick Start](#-quick-start) • [View Demo](#) • [Read Docs](#-documentation)

**Made with ❤️ by developers, for developers**

⭐ **Star this repo** if you find it helpful!

---

**[⬆ back to top](#-action-items-manager)**

</div>

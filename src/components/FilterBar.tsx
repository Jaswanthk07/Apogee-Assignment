import React, { useState, useCallback } from "react";
import { Search, SlidersHorizontal, RotateCcw, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Priority,
  TaskStatus,
  TaskType,
  FilterOptions,
} from "@/lib/index";

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSearchChange: (search: string) => void;
}

export function FilterBar({ onFilterChange, onSearchChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    priority: "all",
    type: "all",
    sortBy: "dueDate",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      onFilterChange(updated);
      return updated;
    });
  }, [onFilterChange]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleReset = () => {
    const reset: FilterOptions = {
      status: "all",
      priority: "all",
      type: "all",
      sortBy: "dueDate",
    };
    setFilters(reset);
    setSearchTerm("");
    onFilterChange(reset);
    onSearchChange("");
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all" && v !== "dueDate"
  ).length;

  return (
    <div className="w-full space-y-4 bg-card/50 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input Section */}
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search tasks, emails, or reminders..."
            className="pl-10 bg-background/50 border-border/50 focus-visible:ring-primary/30"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-2 mr-2 border-r border-border/50 pr-4">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sort by</span>
            <Select
              value={filters.sortBy}
              onValueChange={(val: any) => updateFilters({ sortBy: val })}
            >
              <SelectTrigger className="w-[130px] h-9 bg-background/50 border-none shadow-none focus:ring-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="createdAt">Created Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Filter Dropdowns Section */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/20">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0 h-5 text-[10px] font-bold bg-primary/10 text-primary border-none">
              {activeFilterCount}
            </Badge>
          )}
        </div>

        {/* Status Filter */}
        <Select
          value={filters.status}
          onValueChange={(val: any) => updateFilters({ status: val })}
        >
          <SelectTrigger className="w-fit h-8 px-3 text-xs bg-secondary/50 border-none rounded-full hover:bg-secondary transition-colors">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
            <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
            <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select
          value={filters.priority}
          onValueChange={(val: any) => updateFilters({ priority: val })}
        >
          <SelectTrigger className="w-fit h-8 px-3 text-xs bg-secondary/50 border-none rounded-full hover:bg-secondary transition-colors">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value={Priority.LOW}>Low</SelectItem>
            <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
            <SelectItem value={Priority.HIGH}>High</SelectItem>
            <SelectItem value={Priority.URGENT}>Urgent</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={filters.type}
          onValueChange={(val: any) => updateFilters({ type: val })}
        >
          <SelectTrigger className="w-fit h-8 px-3 text-xs bg-secondary/50 border-none rounded-full hover:bg-secondary transition-colors">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="reminder">Reminder</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="calendar">Calendar</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

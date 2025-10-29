import React, { useState } from 'react';
import { Task } from '../../types';
import { formatDate, getPriorityColor } from '../../utils/formatters';
import { CheckCircle, Circle, Clock, Pencil, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleComplete,
  onDelete
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const priorityBadge = (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
      {task.priority}
    </span>
  );
  
  const dueDateFormatted = formatDate(task.dueDate);
  const isPastDue = new Date(task.dueDate) < new Date() && !task.completed;
  
  return (
    <div 
      className={`p-4 border rounded-lg mb-2 transition-all duration-200 ${
        task.completed 
          ? 'bg-gray-50 border-gray-200' 
          : isPastDue 
          ? 'bg-red-50 border-red-200' 
          : 'bg-white border-gray-200 hover:border-blue-300'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start">
        <button
          className="mt-1 mr-3 text-gray-400 hover:text-blue-500 transition-colors"
          onClick={() => onToggleComplete(task.id, !task.completed)}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className={`text-sm font-medium ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h4>
            
            <div className="flex items-center ml-4 space-x-2">
              {priorityBadge}
              
              {(isHovering || task.completed) && (
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={() => onToggleComplete(task.id, !task.completed)}
                    aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {task.completed ? (
                      <Circle className="h-4 w-4 text-gray-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    aria-label="Edit task"
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={() => onDelete(task.id)}
                    aria-label="Delete task"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className={`mt-1 text-sm ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span className={`flex items-center ${
              isPastDue && !task.completed ? 'text-red-600 font-medium' : ''
            }`}>
              <Clock className="mr-1 h-3 w-3" />
              {isPastDue && !task.completed ? 'Past due: ' : 'Due: '}
              {dueDateFormatted}
            </span>
            
            <span className="mx-2">•</span>
            
            <span className="capitalize">{task.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
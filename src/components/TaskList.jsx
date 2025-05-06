import React from 'react';
import { Check, X, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map(task => (
        <li key={task.id} className="py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </p>
              <p className="text-sm text-gray-500">
                Created {formatDistanceToNow(task.createdAt, { addSuffix: true })}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-700">
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

import { Calendar } from "lucide-react";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center space-x-3 mb-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="rounded text-green-500"
        />
        <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
        {task.startDate && (
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            開始: {task.startDate}
          </div>
        )}
        {task.dueDate && (
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            期限: {task.dueDate}
          </div>
        )}
      </div>
      
      {task.notes && (
        <p className="text-sm text-gray-600 bg-white p-2 rounded border">
          {task.notes}
        </p>
      )}
    </div>
  );
}
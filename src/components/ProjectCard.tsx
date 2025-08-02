import { Project, Task } from "../types";

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export default function ProjectCard({ project, tasks, onToggleTask }: ProjectCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>
      {project.description && (
        <p className="text-gray-600 mt-1">{project.description}</p>
      )}
      <div className="mt-3">
        <p className="text-sm text-gray-500 mb-2">
          タスク ({tasks.length}件)
        </p>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="rounded text-blue-500"
              />
              <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import "./App.css";
import { useState } from "react";
import { Plus, FileText, Folder } from "lucide-react";
import { Task, Project } from "./types";
import TaskCard from "./components/TaskCard";
import ProjectCard from "./components/ProjectCard";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Form states
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    startDate: '',
    dueDate: '',
    notes: '',
    projectId: ''
  });

  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    description: ''
  });

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        ...newTask,
        id: Date.now().toString(),
        completed: false,
        projectId: newTask.projectId || undefined
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', startDate: '', dueDate: '', notes: '', projectId: '' });
      setShowTaskForm(false);
    }
  };

  const handleAddProject = () => {
    if (newProject.name.trim()) {
      const project: Project = {
        ...newProject,
        id: Date.now().toString()
      };
      setProjects([...projects, project]);
      setNewProject({ name: '', description: '' });
      setShowProjectForm(false);
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTasksForProject = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getUnassignedTasks = () => {
    return tasks.filter(task => !task.projectId);
  };

  return (
    <main className="mx-auto mt-8 max-w-4xl p-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-8">
        <h1 className="text-center text-4xl font-bold">PTodo</h1>
        <p className="text-center text-lg mt-2 opacity-90">プロジェクト管理とタスク管理</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Folder className="mr-2" size={24} />
              プロジェクト
            </h2>
            <button
              onClick={() => setShowProjectForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Plus size={20} className="mr-2" />
              追加
            </button>
          </div>

          {showProjectForm && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4 border-2 border-blue-200">
              <h3 className="font-semibold mb-3">新しいプロジェクト</h3>
              <input
                type="text"
                placeholder="プロジェクト名"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="説明"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddProject}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  作成
                </button>
                <button
                  onClick={() => setShowProjectForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                tasks={getTasksForProject(project.id)}
                onToggleTask={toggleTask}
              />
            ))}
            {projects.length === 0 && (
              <p className="text-gray-500 text-center py-8">プロジェクトがありません</p>
            )}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <FileText className="mr-2" size={24} />
              タスク
            </h2>
            <button
              onClick={() => setShowTaskForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Plus size={20} className="mr-2" />
              追加
            </button>
          </div>

          {showTaskForm && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4 border-2 border-green-200">
              <h3 className="font-semibold mb-3">新しいタスク</h3>
              <input
                type="text"
                placeholder="タスク名"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">開始日</label>
                  <input
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">期限</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              <select
                value={newTask.projectId}
                onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">プロジェクトを選択（任意）</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>

              <textarea
                placeholder="備考"
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="w-full p-2 border rounded-lg mb-3 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={handleAddTask}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  作成
                </button>
                <button
                  onClick={() => setShowTaskForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          )}

          {/* Unassigned Tasks */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">未割り当てタスク</h3>
            {getUnassignedTasks().map((task) => (
              <TaskCard 
                key={task.id}
                task={task}
                onToggle={toggleTask}
              />
            ))}
            {getUnassignedTasks().length === 0 && (
              <p className="text-gray-500 text-center py-4">未割り当てタスクがありません</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

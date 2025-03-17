import { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskService';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ titulo: '', descripcion: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const createdTask = await createTask(newTask);
    setTasks([...tasks, createdTask]);
    setNewTask({ titulo: '', descripcion: '', completada: false });
  };

  const handleEditTask = (taskId) => {
    setIsEditing(true);
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask({
      titulo: taskToEdit.titulo,
      descripcion: taskToEdit.descripcion,
      completada: taskToEdit.completada,
    });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!editingTaskId) {
      console.error('editingTaskId no definido');
      return;
    }
    const updatedTask = await updateTask(editingTaskId, newTask);
    setTasks(
      tasks.map((task) => (task.id === editingTaskId ? updatedTask : task))
    );
    setNewTask({ titulo: '', descripcion: '', completada: false });
    setIsEditing(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error('taskId no definido');
      return;
    }
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id != taskId));
  };

  const handleToggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    const updatedTask = await updateTask(taskId, {
      ...taskToUpdate,
      completada: !taskToUpdate.completada,
    });
    setTasks(tasks.map((task) => (task.id === taskId ? updateTask : task)));
  };

  return (
    <div>
      <h1>Gestion de tareas</h1>

      <form onSubmit={isEditing ? handleUpdateTask : handleCreateTask}>
        <input
          type="text"
          placeholder="Titulo"
          value={newTask.titulo}
          onChange={(e) => setNewTask({ ...newTask, titulo: e.target.value })}
        />
        <textarea
          placeholder="Descripcion"
          value={newTask.descripcion}
          onChange={(e) =>
            setNewTask({ ...newTask, descripcion: e.target.value })
          }
        />
        <button type="submit">
          {isEditing ? 'Actualizar' : 'Crear'} tarea
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.titulo}</h3>
            <p>{task.descripcion}</p>
            <button onClick={() => handleEditTask(task.id)}>Editar</button>
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
            <p>
              {task.completada ? 'Completada' : 'Pendiente'}
              <button onClick={() => handleToggleComplete(task.id)}>
                {task.completada
                  ? 'Marcar como pendiente'
                  : 'Marcar como completada'}
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Task;

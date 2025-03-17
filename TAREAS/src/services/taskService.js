const API_URL = 'http://127.0.0.1:5000/tasks';

export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener tareas');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Error al crear tarea');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTask = async (taskId, updateTask) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateTask),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar tarea');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw Error('Error al eliminar la tarea');
    }
  } catch (error) {
    console.error(error);
  }
};

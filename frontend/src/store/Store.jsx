import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      isAddPopupOpen: false,
      isEditPopupOpen: false,
      isDetailsPopupOpen: false,
      selectedTask: null,

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: state.tasks.length + 1 }],
        })),

      editTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
          isDetailsPopupOpen: false,
        })),

      setAddPopupOpen: (isOpen) => set({ isAddPopupOpen: isOpen }),

      setEditPopupOpen: (isOpen, task = null) =>
        set({ isEditPopupOpen: isOpen, selectedTask: task }),

      setDetailsPopupOpen: (isOpen, task = null) =>
        set({ isDetailsPopupOpen: isOpen, selectedTask: task }),
    }),
    {
      name: 'task-storage', // key in localStorage
      partialize: (state) => ({ tasks: state.tasks }), // only persist tasks
    }
  )
);

export default useTaskStore;

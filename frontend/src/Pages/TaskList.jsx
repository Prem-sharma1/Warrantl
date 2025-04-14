import React, { useState, useEffect, useRef } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import useTaskStore from '../store/Store';

const TaskItem = ({ task }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { deleteTask, setEditPopupOpen, setDetailsPopupOpen } = useTaskStore();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-between p-4 relative flex-wrap gap-2 hover:bg-gray-50 cursor-pointer"
      onClick={() => setDetailsPopupOpen(true, task)}
    >
      <div className="flex items-center space-x-4 gap-2 flex-wrap">
        <input onClick={(e) => e.stopPropagation()} type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
        <div className="flex items-center gap-2">
          {task.emoji && <span className="text-lg">{task.emoji}</span>}
          {task.image && (
            <img
              src={task.image}
              alt="Task"
              className="w-8 h-8 object-cover rounded"
            />
          )}
          <span className="text-lg">{task.title}</span>
        </div>
        {task.tag && (
          <span className="bg-blue-100 text-blue-500 text-sm font-medium px-2 py-1 rounded">
            {task.tag}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {task.avatars && (
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={`https://placehold.co/32x32?text=${i}`}
                alt={`Person ${i}`}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
          </div>
        )}
        <span className="text-gray-500 whitespace-nowrap">{task.time}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="relative focus:outline-none"
        >
          <FaEllipsisV className="text-gray-500" />
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditPopupOpen(true, task);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

const TaskPopup = ({ isEdit = false }) => {
  const {
    selectedTask,
    addTask,
    editTask,
    setAddPopupOpen,
    setEditPopupOpen,
  } = useTaskStore();
  const [title, setTitle] = useState(selectedTask?.title || '');
  const [description, setDescription] = useState(selectedTask?.description || '');
  const [time, setTime] = useState(selectedTask?.time || '');
  const [tag, setTag] = useState(selectedTask?.tag || '');
  const [image, setImage] = useState(selectedTask?.image || '');
  const [emoji, setEmoji] = useState(selectedTask?.emoji || '');
  const [avatars, setAvatars] = useState(selectedTask?.avatars || false);

  const emojis = ['📚', '💻', '🎨', '☕', '📅', '🚀'];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      id: isEdit ? selectedTask.id : undefined,
      title,
      description,
      time,
      tag,
      image,
      emoji,
      avatars,
    };

    if (isEdit) {
      editTask(taskData);
      setEditPopupOpen(false);
    } else {
      addTask(taskData);
      setAddPopupOpen(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      isEdit ? setEditPopupOpen(false) : setAddPopupOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., 08.00 - 09.00"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., #Project"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-2 w-16 h-16 object-cover rounded"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Emoji</label>
            <select
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">None</option>
              {emojis.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end space-x-2">
            <button
              type="button"
              onClick={() => (isEdit ? setEditPopupOpen(false) : setAddPopupOpen(false))}
              className="px-4 py-2 bg-gray-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-xl"
            >
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TaskDetailsPopup = () => {
  const { selectedTask, setDetailsPopupOpen, setEditPopupOpen, deleteTask } =
    useTaskStore();

  if (!selectedTask) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setDetailsPopupOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{selectedTask.title}</h2>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {selectedTask.description || 'No description'}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Time:</strong> {selectedTask.time}
        </p>
        {selectedTask.tag && (
          <p className="text-gray-700 mb-4">
            <strong>Tag:</strong> {selectedTask.tag}
          </p>
        )}
        {selectedTask.emoji && (
          <p className="text-gray-700 mb-4">
            <strong>Emoji:</strong> {selectedTask.emoji}
          </p>
        )}
        {selectedTask.image && (
          <p className="text-gray-700 mb-4">
            <strong>Image:</strong>
            <img
              src={selectedTask.image}
              alt="Task"
              className="mt-2 w-24 h-24 object-cover rounded"
            />
          </p>
        )}
        {selectedTask.avatars && (
          <p className="text-gray-700 mb-4">
            <strong>Avatars:</strong> Enabled
          </p>
        )}
        <div className="flex justify-end gap-2 space-x-2">
          <button
            onClick={() => setDetailsPopupOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={() => {
              setDetailsPopupOpen(false);
              setEditPopupOpen(true, selectedTask);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(selectedTask.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TaskList() {
  const { tasks, isAddPopupOpen, isEditPopupOpen, isDetailsPopupOpen, setAddPopupOpen } =
    useTaskStore();

  return (
    <div className="bg-gray-100 p-4 min-h-screen font-[Roboto]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <p className="text-gray-500">
              Today,{' '}
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAddPopupOpen(true)}
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <p className="p-4 text-gray-500">No tasks yet. Add one!</p>
          ) : (
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>
      </div>

      {isAddPopupOpen && <TaskPopup />}
      {isEditPopupOpen && <TaskPopup isEdit />}
      {isDetailsPopupOpen && <TaskDetailsPopup />}
    </div>
  );
}
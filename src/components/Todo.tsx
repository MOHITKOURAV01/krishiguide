import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  category?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'pending' | 'in-progress' | 'completed';
}

interface TodoProps {
  category?: string;
}

const Todo: React.FC<TodoProps> = ({ category = 'all' }) => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const savedTodos = localStorage.getItem('krishiGuide-todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos, (key, value) => {
          if (key === 'createdAt') return new Date(value);
          return value;
        });
        return parsedTodos;
      } catch (e) {
        console.error('Error loading todos:', e);
        return [];
      }
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('krishiGuide-todos', JSON.stringify(todos));
  }, [todos]);

  // Focus the edit input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
      category: category !== 'all' ? category : undefined,
      status: 'pending',
      priority: 'medium',
      dueDate: getTomorrowDate()
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
    
    // Focus the input again for quick adding of multiple tasks
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: string, text: string) => {
    setIsEditing(id);
    setEditValue(text);
  };

  const saveEdit = () => {
    if (!isEditing) return;
    
    if (editValue.trim() === '') {
      deleteTodo(isEditing);
    } else {
      setTodos(
        todos.map(todo => 
          todo.id === isEditing ? { ...todo, text: editValue.trim() } : todo
        )
      );
    }
    
    setIsEditing(null);
    setEditValue('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(null);
      setEditValue('');
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = category === 'all' 
    ? todos 
    : todos.filter(todo => todo.category === category || !todo.category);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  // Sort todos by completion status and creation date
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // First sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then sort by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Farming Tasks
        </h2>
        
        <form
          onSubmit={addTodo} 
          className="flex mb-6 group"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
          >
            Add
          </button>
        </form>
        
        <div className="mb-4 flex space-x-2">
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as 'all' | 'active' | 'completed')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === filterType
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              } transition-all duration-300`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
        
        {sortedTodos.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedTodos.map(todo => (
              <li
                key={todo.id}
                className="py-3 flex items-center justify-between group"
              >
                <div className="flex items-center flex-grow">
                  <div>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  
                  {isEditing === todo.id ? (
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={handleEditKeyDown}
                      className="ml-3 flex-grow px-2 py-1 border-b border-green-500 bg-transparent focus:outline-none dark:text-gray-200"
                    />
                  ) : (
                    <span
                      onClick={() => !todo.completed && startEditing(todo.id, todo.text)}
                      className={`ml-3 transition-all duration-300 ${
                        todo.completed 
                          ? 'text-gray-500 dark:text-gray-400 line-through' 
                          : 'text-gray-800 dark:text-gray-200 cursor-pointer'
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  {!isEditing && !todo.completed && (
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="text-gray-500 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-6 text-gray-500 dark:text-gray-400 italic">
            {filter === 'all' 
              ? 'No tasks yet. Add some tasks to get started!'
              : filter === 'active'
                ? 'No active tasks. All tasks are completed!'
                : 'No completed tasks. Complete some tasks to see them here!'}
          </p>
        )}
        
        <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left</span>
          {todos.some(todo => todo.completed) && (
            <button
              onClick={clearCompleted}
              className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-yellow-800 dark:text-yellow-200 text-sm">
        <p className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            <strong>Tip:</strong> Click on a task to edit it. Use this task list to keep track of your farming activities such as
            planting, fertilizing, watering, and harvesting.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Todo; 
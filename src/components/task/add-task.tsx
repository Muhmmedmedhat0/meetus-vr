import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/types';
import Plus from '../icons/plus';
import { createTask, fetchTasks } from '../../app/features/task-slice';

function AddTask() {
  const { user } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.task);
  const [taskName, setTaskName] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAddTask = async () => {
    if (loading || !user || !user.user || !taskName.trim()) {
      return;
    }

    const newTask = {
      name: taskName,
      status: false,
      user: user.user.id,
    };

    await dispatch(createTask(newTask));
    setTaskName('');
    await dispatch(fetchTasks({ id: user.user.id }));
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <input
        className="w-96 border-b-2 border-gray-500 text-black outline-none"
        type="text"
        placeholder="Enter your task here"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button
        className={`ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex`}
        onClick={handleAddTask}
        disabled={loading}>
        {loading ? (
          'Adding...'
        ) : (
          <>
            <Plus />
            <span>Add</span>
          </>
        )}
      </button>
    </div>
  );
}

export default AddTask;

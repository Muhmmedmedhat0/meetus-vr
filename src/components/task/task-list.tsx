import AddTask from './add-task';
import SingleTask from './single-task';
import FilterTask from './filter-task';
import { useState } from 'react';
import { Task } from '../../app/features/task-slice';
interface TaskListProps {
  tasks: Task[] | null;
  loading: boolean;
}

function TaskList({ tasks, loading }: TaskListProps) {
  const [isSorted, setIsSorted] = useState<boolean | undefined>(undefined);

  const handleSortChange = (filter: boolean | undefined) => {
    setIsSorted(filter);
  };

  // Filter tasks based on isSorted value
  const filteredTasks = tasks
    ? isSorted !== undefined
      ? tasks.filter((task) => task.status === isSorted)
      : tasks
    : [];

  const handleResetFilter = () => {
    setIsSorted(undefined);
  };
  return (
    <div className="antialiased  text-slate-700 mx-4">
      <div className="max-w-lg mx-auto my-20 bg-white p-8 rounded-xl shadow shadow-slate-400">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-medium ">Tasks list</h1>
          <FilterTask
            onFilterChange={handleSortChange}
            onResetFilter={handleResetFilter}
          />
        </div>
        <AddTask />
        <>
          {loading ? (
            <p>Loading...</p>
          ) : filteredTasks.length > 0 ? (
            <div>
              {filteredTasks.map((task: Task, index: number) => (
                <SingleTask
                  name={task.name}
                  status={task.status}
                  key={index}
                  id={task.id}
                />
              ))}
            </div>
          ) : (
            <p>No tasks available.</p>
          )}
        </>
      </div>
    </div>
  );
}

export default TaskList;

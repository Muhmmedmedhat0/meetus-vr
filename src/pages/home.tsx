import { useEffect } from 'react';
import TaskList from '../components/task/task-list';
import { fetchTasks } from '../app/features/task-slice';
import { useAppDispatch, useAppSelector } from '../app/types';
import Navbar from '../components/navbar/navbar';

function Home() {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.task);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks({ id: user.user.id }));
    }
  }, [dispatch, user]);

  return (
    <div>
      <Navbar name={user?.user.username} />
      <TaskList loading={loading} tasks={tasks} />
    </div>
  );
}

export default Home;

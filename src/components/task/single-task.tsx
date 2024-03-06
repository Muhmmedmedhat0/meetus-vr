import { useCallback, useMemo, useRef, useState } from 'react';
import {
  deleteTask,
  fetchTasks,
  updateTask,
} from '../../app/features/task-slice';
import { useAppDispatch, useAppSelector } from '../../app/types';
import Check from '../icons/check';
import Trach from '../icons/trach';
import Wrong from '../icons/wrong';
import Edit from '../icons/edit';
import Done from '../icons/done';

interface TaskProps {
  name: string;
  status: boolean;
  id?: number;
}
function SingleTask({ name, status, id }: TaskProps) {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<boolean>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editedName, setEditedName] = useState<string>(name);

  const { user } = useAppSelector((state) => state.user);
  const userId = useMemo(() => user?.user.id, [user?.user.id]);
  const taskId = useMemo(() => id, [id]);

  const handleClick = useCallback(
    async (newStatus: boolean) => {
      if (taskId !== undefined && userId !== undefined) {
        await dispatch(updateTask({ id: taskId, status: newStatus }));
        dispatch(fetchTasks({ id: userId }));
      }
    },
    [dispatch, taskId, userId],
  );

  const handleDeleteClick = useCallback(async () => {
    if (taskId !== undefined && userId !== undefined) {
      await dispatch(deleteTask({ id: taskId }));
      dispatch(fetchTasks({ id: userId }));
    }
  }, [dispatch, taskId, userId]);



  const handleDoneClick = useCallback(() => {
    // Get the current value from the input ref
    const editedValue = inputRef.current?.value;

    if (editedValue !== undefined && taskId !== undefined && userId !== undefined) {
      // Dispatch the action with the updated value
      dispatch(updateTask({ id: taskId, name: editedValue }));
      dispatch(fetchTasks({ id: userId }));
      setEdit(false);
    }
  }, [dispatch, taskId, userId]);
  return (
    <div id="tasks" className="my-5">
      <div
        id="task"
        className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150">
        <div className="inline-flex items-center space-x-2">
          <div>
            {status ? (
              <Check onClick={() => handleClick(false)} />
            ) : (
              <Wrong onClick={() => handleClick(true)} />
            )}
          </div>
          {edit ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              ref={inputRef}
            />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div className="flex space-x-4">
          {edit ? (
            <Done onClick={handleDoneClick} />
          ) : (
            <Edit onClick={() => setEdit(true)} />
          )}

          <Trach onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
}

export default SingleTask;

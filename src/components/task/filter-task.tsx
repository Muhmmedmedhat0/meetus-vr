import Clock from '../icons/clock';
import List from '../icons/list';

interface Props {
  onFilterChange: (filter: boolean) => void;
  onResetFilter: () => void;
}

function FilterTask({ onFilterChange, onResetFilter }: Props) {
  return (
    <div className="inline-flex space-x-2 items-center">
      <div
        onClick={() => onFilterChange(true)}
        className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-green-600 hover:bg-green-500 cursor-pointer">
        <Clock />
        <span className="text-sm">Active</span>
      </div>
      <div
        onClick={() => onFilterChange(false)}
        className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-red-600 hover:bg-red-500 cursor-pointer">
        <List />
        <span className="text-sm">Not</span>
      </div>
      <div
        onClick={() => onResetFilter()}
        className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-red-600 hover:bg-red-500 cursor-pointer">
        <List />
        <span className="text-sm">Reset</span>
      </div>
    </div>
  );
}

export default FilterTask;

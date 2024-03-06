interface DoneProps {
  onClick: () => void;
}
function Done({ onClick }: DoneProps) {
  return (
    <span title="update task name" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-purple-500 bg-red cursor-pointer">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </span>
  );
}

export default Done;

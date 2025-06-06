interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  state?: boolean;
}

export default function Button({
  onClick,
  children,
  className = "",
  state,
}: ButtonProps) {
  return (
    <button
      disabled={state}
      onClick={onClick}
      className={`${
        state
          ? "bg-gray-300 cursor-not-allowed"
          : "cursor-pointer bg-main-red hover:bg-main-red-hover"
      }  text-white px-4 py-1 rounded-lg  w-full sm:w-auto ${className}`}
    >
      {children}
    </button>
  );
}

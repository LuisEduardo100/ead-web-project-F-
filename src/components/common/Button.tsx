interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      className="bg-main-red text-white px-4 py-1 rounded hover:bg-main-red-hover w-full sm:w-auto"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

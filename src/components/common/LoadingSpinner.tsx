interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export function LoadingSpinner({
  size = "medium",
  color = "border-blue-500",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`
        animate-spin rounded-full
        ${sizeClasses[size]}
        ${color}
        border-t-transparent border-r-transparent
      `}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

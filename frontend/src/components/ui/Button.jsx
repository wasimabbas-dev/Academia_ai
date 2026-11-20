export function Button({ children, className = '', disabled, type = 'button', ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
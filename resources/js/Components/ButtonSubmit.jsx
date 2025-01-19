export default function ButtonSubmit({
  type = "submit",
  className = "",
  disabled = false,
  children = "Submit",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`py-2 px-4 text-white rounded-xl shadow transition-all 
          ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } 
          ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

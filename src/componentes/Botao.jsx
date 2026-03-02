import "./Botao.css";

export default function Button({ children, variant = "primary", onClick }) {

  const baseStyle =
    "px-6 py-3 rounded-lg font-medium transition";

  const variants = {
    primary: "bg-purple-500 text-white hover:bg-purple-600",
    outline: "border border-purple-500 text-purple-500 hover:bg-purple-50",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
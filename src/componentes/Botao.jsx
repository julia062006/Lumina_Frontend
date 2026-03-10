// Botao.jsx
import "./Botao.css";

export default function Botao({ children, onClick, variant = "primary", ...props }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export function BotaoPrimario({ children, onClick, ...props }) {
  return <Botao variant="primario" onClick={onClick} {...props}>{children}</Botao>;
}

export function BotaoSecundario({ children, onClick, ...props }) {
  return <Botao variant="secundario" onClick={onClick} {...props}>{children}</Botao>;
}

export function BotaoCard({ children, onClick, ...props }) {
  return <Botao variant="card" onClick={onClick} {...props}>{children}</Botao>;
}
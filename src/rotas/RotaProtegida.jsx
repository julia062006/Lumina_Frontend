import { Navigate } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";

export default function RotaProtegida({ children }) {
    const { token } = useUsuario();

    if (!token) {
        return <Navigate to="/entrar" state={{ precisaLogin: true }} replace />;
    }

    return children;
}
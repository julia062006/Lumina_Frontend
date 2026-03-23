import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import { BotaoSecundario } from "../componentes/Botao";

function Perfil() {

    const navigate = useNavigate();

    const { usuario, sair: sairContexto } = useUsuario();

    function sair() {

        sairContexto();

        navigate("/entrar");
    }

    return (
        <div>
            <h2>Perfil</h2>
            <p>Nome: {usuario.nome}</p>
            <p>Email: {usuario.email}</p>
            <p>CPF: {usuario.cpf}</p>

            <BotaoSecundario onClick={sair}>
                <LogOut />
                Sair
            </BotaoSecundario>
        </div>
    );
}

export default Perfil;
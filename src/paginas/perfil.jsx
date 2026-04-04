import { LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Perfil() {

    const navigate = useNavigate();
    const { usuario, sair: sairContexto } = useUsuario();

    function sair() {
        sairContexto();
        navigate("/entrar");
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">

            <h2 className="text-2xl font-bold mb-4">Perfil</h2>
            <BotaoSecundario onClick={() => navigate("/editarPerfil")}>
                <Pencil />
                Editar perfil
            </BotaoSecundario>

            <div className="space-y-2">
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
            </div>

            <div className="mt-6">
                <BotaoPrimario onClick={() => navigate("/painel")}>
                    Acessar painel
                </BotaoPrimario>
            </div>

            <div className="mt-6">
                <BotaoSecundario onClick={sair}>
                    <LogOut />
                    Sair
                </BotaoSecundario>
            </div>


        </div>
    );
}

export default Perfil;
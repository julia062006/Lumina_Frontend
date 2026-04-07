import { LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";

function Perfil() {

    const navigate = useNavigate();
    const { usuario, sair: sairContexto } = useUsuario();

    function sair() {
        sairContexto();
        navigate("/entrar");
    }

    return (
        <div className="bg-gradient-to-b from-[#005DAA] to-[#7851A9] -mt-6 -mb-24 p-24">
            <div className="max-w-md mx-auto p-6 border rounded-lg shadow bg-white">

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Perfil</h2>
                    <BotaoSecundario onClick={() => navigate("/editarPerfil")}>
                        <Pencil />
                        Editar perfil
                    </BotaoSecundario>
                </div>


                <div className="space-y-2">
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="mt-6">
                        <BotaoSecundario onClick={sair}>
                            <LogOut />
                            Sair
                        </BotaoSecundario>
                    </div>

                    <div className="mt-6">
                        <BotaoPrimario onClick={() => navigate("/painel")}>
                            Acessar painel
                        </BotaoPrimario>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
import { LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import { BotaoSecundario } from "../componentes/Botao";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Perfil() {

    const navigate = useNavigate();
    const { usuario, sair: sairContexto } = useUsuario();

    function sair() {
        sairContexto();
        navigate("/entrar");
    }
    useEffect(() => {
        if (!usuario) {
            Swal.fire({
                icon: "warning",
                title: "Você precisa estar logado",
                text: "Faça login para acessar o perfil"
            }).then(() => {
                navigate("/entrar");
            });
        }
    }, [usuario, navigate]);


    if (!usuario) {
        return null;
    }


    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">

            <h2 className="text-2xl font-bold mb-4">Perfil</h2>
            <BotaoSecundario onClick={() => navigate("/editarPerfil")}>
                <Pencil />
                Editar usuário
            </BotaoSecundario>

            <div className="space-y-2">
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>CPF:</strong> {formatarCPF(usuario.cpf)}</p>
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

function formatarCPF(cpf) {
    if (!cpf) return "";

    return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export default Perfil;
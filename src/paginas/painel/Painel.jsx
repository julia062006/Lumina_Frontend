import { useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../../componentes/Botao";

const SECOES = [
    { titulo: "Livros", descricao: "Gerenciar livros cadastrados", rota: "/painel/livros" },
    { titulo: "Autores", descricao: "Gerenciar autores cadastrados", rota: "/painel/autores" },
    { titulo: "Categorias", descricao: "Gerenciar categorias", rota: "/painel/categorias" },
    { titulo: "Usuários", descricao: "Visualizar usuários cadastrados", rota: "/painel/usuarios" },
];

function Painel() {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Painel</h1>
                <BotaoSecundario onClick={() => navigate("/")}>
                    Voltar
                </BotaoSecundario>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SECOES.map((secao) => (
                    <div
                        key={secao.rota}
                        onClick={() => navigate(secao.rota)}
                        className="border rounded-lg p-6 cursor-pointer hover:shadow-md transition"
                    >
                        <h2 className="text-lg font-medium mb-1">{secao.titulo}</h2>
                        <p className="text-sm text-gray-500">{secao.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Painel;
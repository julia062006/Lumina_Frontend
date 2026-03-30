import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLivros } from "../../../services/api";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

function ListarLivros() {
    const navigate = useNavigate();
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await getLivros();
                setLivros(dados);
            } catch {
                await alertaErro(MENSAGENS.ERRO_SERVIDOR);
            }
        }
        carregar();
    }, []);

    async function excluir(id) {
        // fazer
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Livros</h1>
                <div className="flex gap-2">
                    <BotaoPrimario onClick={() => navigate("/painel/cadastroLivro")}>
                        Cadastrar
                    </BotaoPrimario>
                    <BotaoSecundario onClick={() => navigate("/painel")}>
                        Voltar
                    </BotaoSecundario>
                </div>
            </div>

            <table className="w-full border text-sm">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="px-4 py-2">Título</th>
                        <th className="px-4 py-2">Preço</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <tr key={livro.id_livro} className="border-t">
                            <td className="px-4 py-2">{livro.titulo}</td>
                            <td className="px-4 py-2">R$ {livro.preco}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <BotaoSecundario onClick={() => navigate(`/painel/livros/editar/${livro.id_livro}`)}>
                                    Editar
                                </BotaoSecundario>
                                <button
                                    onClick={() => excluir(livro.id_livro)}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarLivros;
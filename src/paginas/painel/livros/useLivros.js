import { useEffect, useState } from "react";
import { getLivros } from "../../../services/api";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

const ITENS_POR_PAGINA = 5;

export function useLivros() {
    const [livros, setLivros] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

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

    const totalPaginas = Math.ceil(livros.length / ITENS_POR_PAGINA);

    const livrosPaginados = livros.slice(
        paginaAtual * ITENS_POR_PAGINA,
        (paginaAtual + 1) * ITENS_POR_PAGINA
    );

    return { livrosPaginados, totalPaginas, paginaAtual, setPaginaAtual };
}
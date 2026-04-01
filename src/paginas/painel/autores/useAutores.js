import { useEffect, useState } from "react";
import { getAutores } from "../../../services/api";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

const ITENS_POR_PAGINA = 5;

export function useAutores() {
    const [autores, setAutores] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await getAutores();
                setAutores(dados.data);
            } catch {
                await alertaErro(MENSAGENS.ERRO_SERVIDOR);
            }
        }
        carregar();
    }, []);

    const totalPaginas = Math.ceil(autores.length / ITENS_POR_PAGINA);

    const autoresPaginados = autores.slice(
        paginaAtual * ITENS_POR_PAGINA,
        (paginaAtual + 1) * ITENS_POR_PAGINA
    );

    return {
        autoresPaginados,
        totalPaginas,
        paginaAtual,
        setPaginaAtual,
    };
}
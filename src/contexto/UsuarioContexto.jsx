import { createContext, useState, useContext, useEffect } from "react";
import { getPerfil } from "../services/api";

const STORAGE_KEYS = {
    TOKEN: "token",
    USUARIO: "usuario",
};

function carregarDoStorage(chave) {
    try {
        const valor = localStorage.getItem(chave);
        return valor ? JSON.parse(valor) : null;
    } catch {
        return null;
    }
}

export const UsuarioContexto = createContext(null);

export function UsuarioProvider({ children }) {

    const [usuario, setUsuario] = useState(() =>
        carregarDoStorage(STORAGE_KEYS.USUARIO)
    );

    const [token, setToken] = useState(() =>
        localStorage.getItem(STORAGE_KEYS.TOKEN)
    );

    useEffect(() => {
        async function carregarPerfil() {
            if (!token) return;

            const resposta = await getPerfil();

            if (resposta.ok) {
                setUsuario(resposta.data);
                localStorage.setItem(
                    STORAGE_KEYS.USUARIO,
                    JSON.stringify(resposta.data)
                );
            }
        }

        carregarPerfil();
    }, [token]);

    function entrar(dadosUsuario, tokenRecebido) {
        if (!dadosUsuario || !tokenRecebido) return;

        localStorage.setItem(STORAGE_KEYS.TOKEN, tokenRecebido);
        localStorage.setItem(
            STORAGE_KEYS.USUARIO,
            JSON.stringify(dadosUsuario)
        );

        setUsuario(dadosUsuario);
        setToken(tokenRecebido);
    }

    function sair() {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USUARIO);

        setUsuario(null);
        setToken(null);
    }

    return (
        <UsuarioContexto.Provider
            value={{ usuario, token, entrar, sair }}
        >
            {children}
        </UsuarioContexto.Provider>
    );
}

export function useUsuario() {
    const contexto = useContext(UsuarioContexto);

    if (!contexto) {
        throw new Error("useUsuario deve ser usado dentro de UsuarioProvider");
    }

    return contexto;
}
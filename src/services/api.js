const API = "http://localhost:3000";

async function tratarResposta(resposta) {
    let data;

    try {
        data = await resposta.json();
    } catch {
        data = { mensagem: "Erro inesperado" };
    }

    return {
        ok: resposta.ok,
        status: resposta.status,
        data
    };
}

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
    };
}

export async function getUsuarios() {
    const resposta = await fetch(API + "/usuarios", {
        headers: getHeaders()
    });

    return tratarResposta(resposta);
}

export async function criarUsuario(dados) {
    const resposta = await fetch(API + "/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    return tratarResposta(resposta);
}

export async function loginUsuario(dados) {
    const resposta = await fetch(API + "/entrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    return tratarResposta(resposta);
}

export async function atualizarUsuario(id, dados) {
    const resposta = await fetch(API + "/usuarios/" + id, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(dados)
    });

    return tratarResposta(resposta);
}

export async function getPerfil() {
    const resposta = await fetch(API + "/perfil", {
        headers: getHeaders()
    });

    return tratarResposta(resposta);
}

export async function criarAutor(dados) {
    const resposta = await fetch(API + "/autores", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: dados
    });

    return tratarResposta(resposta);
}

export async function getAutores() {
    const resposta = await fetch(API + "/autores");

    if (!resposta.ok) {
        throw new Error("Erro ao buscar autores");
    }

    return tratarResposta(resposta);
}

export async function deletarAutores(id) {
    const resposta = await fetch(API + "/autores/" + id, {
        method: "DELETE",
        headers: getHeaders()
    });

    return tratarResposta(resposta);
}

export async function editarAutor(id, dados) {
    const token = localStorage.getItem("token");
    const resposta = await fetch(API + "/autores/" + id, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token
        },
        body: dados
    });

    return tratarResposta(resposta);
}


export async function getCategorias() {
    const resposta = await fetch(API + "/categorias", {
        method: "GET"
    });

    return tratarResposta(resposta);
}

export async function getCategoriasDestaque() {
    const resposta = await fetch("http://localhost:3000/categorias/destaque");
    const data = await resposta.json();
    return { ok: resposta.ok, data };
}

export async function deletarCategorias(id) {
    const resposta = await fetch(API + "/categorias/" + id, {
        method: "DELETE",
        headers: getHeaders()
    });

    return tratarResposta(resposta);
}

export async function criarCategoria(dados) {
    const resposta = await fetch(API + "/categorias", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(dados)
    });

    return tratarResposta(resposta);
}


export async function getLivros() {
    const resposta = await fetch(API + "/livros");

    if (!resposta.ok) {
        throw new Error("Erro ao buscar livros");
    }

    return await resposta.json();
}

export async function getLivrosDestaque() {
    const resposta = await fetch(API + "/livros/destaque");

    if (!resposta.ok) {
        throw new Error("Erro ao buscar livros em destaque");
    }

    return await resposta.json();
}

export async function criarLivro(dados) {
    const resposta = await fetch(API + "/livros", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: dados
    });

    return tratarResposta(resposta);
}

export async function deletarLivro(id) {
    const resposta = await fetch(API + "/livros/" + id, {
        method: "DELETE",
        headers: getHeaders()
    });

    return tratarResposta(resposta);
}
const API = "http://localhost:3000";

export function getUsuarios(){
    return fetch(API + "/usuarios");
}

export function criarUsuario(dados){
    return fetch(API + "/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}
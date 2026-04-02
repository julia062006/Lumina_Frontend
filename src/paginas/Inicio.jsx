import { Link, useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import bg from "../imagens/Livros2.png";
import React, { useEffect, useState } from "react";
//import { getCategorias, getLivrosDestaque } from "../services/api";
import Card from "../componentes/Card";
//import { getCategoriasDestaque, getLivrosDestaque } from "../services/api";
// Remover as linhas 5 e 7, deixar apenas isso:
import { getCategoriasDestaque, getLivrosDestaque } from "../services/api";

function mapearLivroParaCard(livro) {
    return {
        title: livro.titulo,
        author: livro.autor?.nome,
        image: `http://localhost:3000/uploads/${livro.capa_imagem}`,
        price: livro.preco ?? 0,
        description: livro.descricao ?? "",
    };
}

function Inicio() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [livrosDestaque, setLivrosDestaque] = useState([]);
    const [loadingLivros, setLoadingLivros] = useState(true);        // ← ADICIONAR
    const [erroLivros, setErroLivros] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarCategorias() {
            try {
                const resposta = await getCategoriasDestaque(); 
                if (resposta.ok) {
                    setCategories(resposta.data);
                } else {
                    console.error(resposta.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        carregarCategorias();
    }, []);

    useEffect(() => {
        async function carregarLivros() {
            try {
                const dados = await getLivrosDestaque();
                setLivrosDestaque(dados);
            } catch (error) {
                setErroLivros("Não foi possível carregar os livros em destaque.");
            } finally {
                setLoadingLivros(false);
            }
        }
        carregarLivros();
    }, []);


    return (
        <main>
            <div
                className="p-16 min-h-screen bg-no-repeat" style={{ backgroundImage: `url(${bg})`, backgroundSize: "1000px", backgroundPosition: "right 35px" }}>

                <section id="inicio" className="max-w-2xl pl-8">
                    <h1 className="text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
                        Ilumine sua<br />
                        <span style={{ color: 'var(--lumina-purple)' }}>Leitura</span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-lg mt-4">
                        Mais do que uma plataforma, a Lumina é o seu portal para conhecimento, imaginação e descoberta.
                    </p>

                    <div className="flex gap-4 mt-6">
                        <BotaoPrimario onClick={() => navigate("/biblioteca")}>
                            Explorar Livros
                        </BotaoPrimario>
                        <Link to="/cadastroUsuario">
                            <BotaoSecundario>Criar Conta</BotaoSecundario>
                        </Link>
                    </div>
                </section>

                <section id="categoria" className="pt-16 bg-muted/30 mt-10">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-medium mb-4 mt-10">
                                Explore por Categoria
                            </h2>
                        </div>
                        {loading ? (
                            <p className="text-center">Carregando...</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {Array.isArray(categories) && categories.map((category) => (
                                    <button
                                        key={category.id_categoria}
                                        onClick={() => navigate(`/biblioteca?categoria=${category.id_categoria}`)}
                                        className="group p-6 rounded-2xl bg-white border border-border/40 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-400/50"
                                    >
                                        <h3 className="font-medium group-hover:text-[var(--lumina-purple)] transition-colors">
                                            {category.nome}
                                        </h3>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section id="Destaque" className="py-2 bg-muted/30 mt-10">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-medium mb-4">
                                Livros em Destaque
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {loadingLivros ? (
                                <p className="text-center col-span-4">Carregando...</p>
                            ) : erroLivros ? (
                                <p className="text-center col-span-4 text-red-500">{erroLivros}</p>
                            ) : (
                                livrosDestaque.map((livro) => (
                                    <Card key={livro.id_livro} livro={mapearLivroParaCard(livro)} />
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Inicio;
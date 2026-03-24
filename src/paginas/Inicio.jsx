import { Link, useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import bg from "../imagens/Livros2.png";
import React, { useEffect, useState } from "react";
import { getCategorias, getLivrosDestaque } from "../services/api";
import Card from "../componentes/Card";

function Inicio() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [livrosDestaque, setLivrosDestaque] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarCategorias() {
            try {
                const resposta = await getCategorias();
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
                const resultado = await getLivrosDestaque();
                if (resultado.ok) {
                    const destaques = resultado.data.filter(livro => livro.destaque === true);
                    setLivrosDestaque(destaques);
                }
            } catch (error) {
                console.error(error);
            }
        }
        carregarLivros();
    }, []);

    return (
        <main>
            <div
                className="p-10 min-h-screen bg-no-repeat"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "1000px",
                    backgroundPosition: "right 35px"
                }}
            >
                <h1 className="text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
                    Ilumine sua <br />
                    <span style={{ color: 'var(--lumina-purple)' }}>Leitura.</span>
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

                <section id="categoria" className="py-16 bg-muted/30 mt-10">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-medium mb-4">
                                Explore por Categoria
                            </h2>
                        </div>
                        {loading ? (
                            <p className="text-center">Carregando...</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {Array.isArray(categories) && categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => navigate(`/biblioteca?categoria=${category.id}`)}
                                        className="group p-6 rounded-2xl bg-white border border-border/40 transition-all hover:shadow-lg hover:-translate-y-1"
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

                <section id="Destaque" className="py-16 bg-muted/30 mt-10">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-medium mb-4">
                                Livros em Destaque
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {livrosDestaque.map((livro) => (
                                <Card
                                    key={livro.id}
                                    titulo={livro.titulo}
                                    autor={livro.autor}
                                    imagem={livro.imagem}
                                />
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default Inicio;
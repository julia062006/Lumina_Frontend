import { useForm } from "react-hook-form";
import { criarLivro, getAutores, getCategorias } from "../services/api";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Input from "../componentes/Input";
import Formulario from "../componentes/Formulario";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CadastrarLivro() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const [capa, setCapa] = useState(null);
    const [pdf, setPdf] = useState(null);

    const [autores, setAutores] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function carregarDados() {
            const respostaAutores = await getAutores();
            const respostaCategorias = await getCategorias();

            if (respostaAutores.ok) {
                setAutores(respostaAutores.data);
            }

            if (respostaCategorias.ok) {
                setCategorias(respostaCategorias.data);
            }
        }

        carregarDados();
    }, []);

    async function cadastrar(dados) {

        const formData = new FormData();

        formData.append("titulo", dados.titulo);
        formData.append("descricao", dados.descricao);
        formData.append("preco", dados.preco);
        formData.append("id_autor", dados.id_autor);
        formData.append("id_categoria", dados.id_categoria);

        formData.append("capa_imagem", capa);
        formData.append("arquivo_pdf", pdf);

        try {

            const resposta = await criarLivro(formData);

            if (!resposta.ok) return;

            alert("Livro cadastrado com sucesso!");
            reset();
            setCapa(null);
            setPdf(null);

        } catch (erro) {
            console.log("Erro ao conectar com o servidor");
        }
    }

    return (
        <div>
            <Formulario titulo="Cadastrar Livro" onSubmit={handleSubmit(cadastrar)}>

                <Input
                    label="Título"
                    name="titulo"
                    placeholder="Digite o título"
                    register={(name) =>
                        register(name, {
                            required: "O título é obrigatório"
                        })
                    }
                    error={errors.titulo}
                />

                <Input
                    label="Descrição"
                    name="descricao"
                    placeholder="Digite a descrição"
                    register={(name) =>
                        register(name, {
                            required: "A descrição é obrigatória"
                        })
                    }
                    error={errors.descricao}
                />

                <Input
                    label="Preço"
                    name="preco"
                    type="number"
                    placeholder="Digite o preço"
                    register={(name) =>
                        register(name, {
                            required: "O preço é obrigatório"
                        })
                    }
                    error={errors.preco}
                />

                <div className="mt-4">
                    <label>Autor</label>
                    <select
                        {...register("id_autor", { required: "Autor é obrigatório" })}
                        className="block w-full mt-2 border p-2"
                    >
                        <option value="">Selecione um autor</option>

                        {autores.map((autor) => (
                            <option key={autor.id_autor} value={autor.id_autor}>
                                {autor.nome}
                            </option>
                        ))}
                    </select>

                    {errors.id_autor && <p>{errors.id_autor.message}</p>}
                </div>

                <div className="mt-4">
                    <label>Categoria</label>
                    <select
                        {...register("id_categoria", { required: "Categoria é obrigatória" })}
                        className="block w-full mt-2 border p-2"
                    >
                        <option value="">Selecione uma categoria</option>

                        {categorias.map((categoria) => (
                            <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>

                    {errors.id_categoria && <p>{errors.id_categoria.message}</p>}
                </div>

                <div className="mt-4">
                    <label>Capa do Livro</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCapa(e.target.files[0])}
                        className="block mt-2"
                    />
                </div>

                {capa && (
                    <img
                        src={URL.createObjectURL(capa)}
                        alt="preview"
                        width="150"
                        className="mt-4"
                    />
                )}

                <div className="mt-4">
                    <label>Arquivo PDF</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setPdf(e.target.files[0])}
                        className="block mt-2"
                    />
                </div>

                <div className="flex gap-4 mt-4">

                    <BotaoPrimario type="submit">
                        Cadastrar
                    </BotaoPrimario>

                    <BotaoSecundario onClick={() => navigate("/")}>
                        Voltar
                    </BotaoSecundario>

                </div>

            </Formulario>
        </div>
    );
}

export default CadastrarLivro;
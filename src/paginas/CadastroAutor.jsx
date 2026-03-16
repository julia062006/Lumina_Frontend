import { useForm } from "react-hook-form";
import { criarAutor } from "../api/api";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Input from "../componentes/Input";
import Formulario from "../componentes/Formulario";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CadastrarAutor() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [foto, setFoto] = useState(null);

    async function cadastrar(dados) {

        const formData = new FormData();

        formData.append("nome", dados.nome);
        formData.append("biografia", dados.biografia);
        formData.append("foto", foto);

        try {

            const resposta = await criarAutor(formData);

            if (!resposta.ok) {
                return
            }

            alert("Autor cadastrado com sucesso!");
            reset();
            setFoto(null);

        } catch (erro) {
            console.log("Erro ao conectar com o servidor");
        }
    }

    return (
        <div>
            <Formulario titulo="Cadastrar Autor" onSubmit={handleSubmit(cadastrar)}>

                <Input
                    label="Nome"
                    name="nome"
                    placeholder="Digite o nome do autor"
                    register={(name) =>
                        register(name, {
                            required: "O nome é obrigatório",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" }
                        })
                    }
                    error={errors.nome}
                />

                <Input
                    label="Biografia"
                    name="biografia"
                    placeholder="Digite a biografia do autor"
                    register={(name) =>
                        register(name, {
                            required: "A biografia é obrigatória"
                        })
                    }
                    error={errors.biografia}
                />

                <div className="mt-4">
                    <label>Foto do Autor</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFoto(e.target.files[0])}
                        className="block mt-2"
                    />
                </div>

                {foto && (
                    <img
                        src={URL.createObjectURL(foto)}
                        alt="preview"
                        width="150"
                        className="mt-4"
                    />
                )}

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
    )
}

export default CadastrarAutor;
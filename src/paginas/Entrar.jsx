import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Input from "../componentes/Input";
import Formulario from "../componentes/Formulario";
import { loginUsuario } from "../api/api";

function Entrar() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    async function entrar(dados) {
    try {

        const resposta = await loginUsuario(dados);

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.mensagem);
            return;
        }

        localStorage.setItem("usuario", JSON.stringify(resultado.usuario));

        alert("Login realizado com sucesso!");

        navigate("/");

    } catch (erro) {
        console.log("Erro ao conectar com o servidor");
    }
}

    return (
        <div>
            <Formulario titulo="Entrar" onSubmit={handleSubmit(entrar)}>

                <Input
                    label="Email"
                    name="email"
                    placeholder="Digite seu email"
                    register={(name) =>
                        register(name, {
                            required: "O email é obrigatório"
                        })
                    }
                    error={errors.email}
                />

                <Input
                    label="Senha"
                    name="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    register={(name) =>
                        register(name, {
                            required: "A senha é obrigatória"
                        })
                    }
                    error={errors.senha}
                />

                <div className="flex gap-4 mt-4">

                    <BotaoPrimario type="submit">
                        Entrar
                    </BotaoPrimario>

                    <BotaoSecundario onClick={() => navigate("/cadastroUsuario")}>
                        Criar conta
                    </BotaoSecundario>

                </div>

            </Formulario>
        </div>
    );
}

export default Entrar;
import { useForm } from "react-hook-form";
import { criarUsuario } from "../api/api";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Input from "../componentes/Input";
import Formulario from "../componentes/Formulario";
import { useNavigate } from "react-router-dom";


function CadastroUsuario() {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const senha = watch("senha");

    async function cadastrar(dados) {
        try {
            const resposta = await criarUsuario(dados);

            if (!resposta.ok) {
                return
            }

            alert("Cadastro realizado com sucesso!");
            reset();
        } catch (erro) {
            console.log("Erro ao conectar com o servidor");
        }
    }

    return (
        <div>
            <Formulario titulo="Faça seu Cadastro" onSubmit={handleSubmit(cadastrar)}>

                <Input
                    label="Nome"
                    name="nome"
                    placeholder="Digite seu nome"
                    register={(name) =>
                        register(name, {
                            required: "O nome é obrigatório",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" }
                        })
                    }
                    error={errors.nome}
                />

                <Input
                    label="Email"
                    name="email"
                    placeholder="Digite seu email"
                    register={(name) =>
                        register(name, {
                            required: "O email é obrigatório",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email inválido"
                            }
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
                            required: "A senha é obrigatória",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" }
                        })
                    }
                    error={errors.senha}
                />

                <Input
                    label="Confirmar Senha"
                    name="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua senha"
                    register={(name) =>
                        register(name, {
                            required: "Confirme sua senha",
                            validate: (value) =>
                                value === senha || "As senhas não são iguais!"
                        })
                    }
                    error={errors.confirmarSenha}
                />

                <Input
                    label="CPF"
                    name="cpf"
                    placeholder="Digite seu CPF"
                    register={(name) =>
                        register(name, {
                            required: "O CPF é obrigatório",
                            pattern: {
                                value: /^\d{11}$/,
                                message: "CPF deve ter 11 dígitos"
                            }
                        })
                    }
                    error={errors.cpf}
                />

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

export default CadastroUsuario;
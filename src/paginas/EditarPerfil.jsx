import { useForm } from "react-hook-form";
import { atualizarUsuario } from "../services/api";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Input from "../componentes/Input";
import Formulario from "../componentes/Formulario";
import { useNavigate } from "react-router-dom";
import InputSenha from "../componentes/InputSenha";
import Swal from "sweetalert2";
import { cpf } from "cpf-cnpj-validator";
import { useEffect } from "react";
import { useUsuario } from "../contexto/UsuarioContexto";

function EditarPerfil() {

    const { usuario, atualizarUsuarioContexto } = useUsuario();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors }
    } = useForm();

    const senha = watch("senha");

     function mascaraCPF(valor) {
        valor = valor.replace(/\D/g, "");
        valor = valor.slice(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return valor;
    }

    useEffect(() => {
        if (!usuario) {
            navigate("/entrar");
            return;
        }

        setValue("nome", usuario.nome);
        setValue("email", usuario.email);
        setValue("cpf",mascaraCPF(usuario.cpf));

    }, [usuario]);

    async function salvar(dados) {
        try {
            delete dados.confirmarSenha;

            if (!dados.senha) {
                delete dados.senha;
            }

            const dadosAtualizados = {
                ...dados,
                email: usuario.email
            };

            const resposta = await atualizarUsuario(usuario.id, dadosAtualizados);

            if (!resposta.ok) {

                if (resposta.data.erros) {
                    resposta.data.erros.forEach((erro) => {
                        setError(erro.path, {
                            type: "server",
                            message: erro.msg
                        });
                    });
                } else if (resposta.data.mensagem) {
                    Swal.fire({
                        icon: "error",
                        title: resposta.data.mensagem
                    });
                }

                return;
            }

            await atualizarUsuarioContexto();

            Swal.fire({
                icon: "success",
                title: "Usuário atualizado com sucesso!"
            });

            navigate("/perfil");

        } catch (erro) {
            console.log("Erro ao atualizar");
        }
    }

    if (!usuario) return null;

    return (
        <div>
            <Formulario titulo="Editar Usuário" onSubmit={handleSubmit(salvar)}>

                <Input
                    label="Nome"
                    name="nome"
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
                    register={(name) => register(name)}
                    error={errors.email}
                    disabled
                />

                <p className="text-sm text-gray-500 -mt-2">
                    O email não pode ser alterado
                </p>

                <InputSenha
                    label="Nova Senha"
                    name="senha"
                    placeholder="Digite a nova senha (opcional)"
                    register={(name) =>
                        register(name, {
                            minLength: {
                                value: 6,
                                message: "Mínimo 6 caracteres"
                            },
                            pattern: {
                                value: /[A-Z]/,
                                message: "Deve ter pelo menos 1 letra maiúscula"
                            },
                            validate: {
                                temEspecial: (value) =>
                                    !value ||
                                    /[^A-Za-z0-9]/.test(value) ||
                                    "Deve ter pelo menos 1 caractere especial"
                            }
                        })
                    }
                    error={errors.senha}
                />

                <InputSenha
                    label="Confirmar Nova Senha"
                    name="confirmarSenha"
                    placeholder="Confirme a nova senha"
                    register={(name) =>
                        register(name, {
                            validate: (value) =>
                                !senha || value === senha || "As senhas não são iguais!"
                        })
                    }
                    error={errors.confirmarSenha}
                />

                <Input
                    label="CPF"
                    name="cpf"
                    register={(name) =>
                        register(name, {
                            required: "O CPF é obrigatório",
                            onChange: (e) => {
                                e.target.value = mascaraCPF(e.target.value);
                            },
                            validate: (value) => {
                                const cpfLimpo = value.replace(/\D/g, "");
                                return cpf.isValid(cpfLimpo) || "CPF inválido";
                            }
                        })
                    }
                    error={errors.cpf}
                />

                <div className="flex gap-4 mt-4 items-center">
                    <BotaoPrimario type="submit">
                        Salvar
                    </BotaoPrimario>

                    <BotaoSecundario type="button" onClick={() => navigate("/perfil")}>
                        Cancelar
                    </BotaoSecundario>
                </div>

            </Formulario>
        </div>
    );
}

export default EditarPerfil;
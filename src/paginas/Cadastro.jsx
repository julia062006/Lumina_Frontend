import { useForm } from "react-hook-form";
import { criarUsuario } from "../services/api";

function Cadastro() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
            <h2>Faça seu Cadastro</h2>

            <form onSubmit={handleSubmit(cadastrar)}>
                <div>
                    <input
                        placeholder="Nome"
                        {...register("nome", {
                            required: "O nome é obrigatório",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" }
                        })}
                    />
                    {errors.nome && <p style={{ color: "red" }}>{errors.nome.message}</p>}
                </div>
                <div>
                    <input
                        placeholder="Email"
                        {...register("email", {
                            required: "O email é obrigatório",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" }
                        })}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        {...register("senha", {
                            required: "A senha é obrigatória",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" }
                        })}
                    />
                    {errors.senha && <p style={{ color: "red" }}>{errors.senha.message}</p>}
                </div>

                <div>
                    <input
                        placeholder="CPF"
                        {...register("cpf", {
                            required: "O CPF é obrigatório",
                            pattern: { value: /^\d{11}$/, message: "CPF deve ter 11 dígitos" }
                        })}
                    />
                    {errors.cpf && <p style={{ color: "red" }}>{errors.cpf.message}</p>}
                </div>

                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    )

}

export default Cadastro;
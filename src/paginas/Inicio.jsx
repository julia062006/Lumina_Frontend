import { Link } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
function Inicio() {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Ilumine sua Leitura.</h1>
            <p className="mt-4 text-gray-600">
                Descubra uma nova dimensão na leitura digital. Acesso ilimitado aos melhores livros, em qualquer dispositivo, a qualquer momento.
            </p>

            <div className="flex gap-4 mt-6">
                <BotaoPrimario>Explorar Livros</BotaoPrimario>

                <Link to="/cadastroUsuario">
                    <BotaoSecundario>Criar Conta</BotaoSecundario>
                </Link>
            </div>

        </div>
    );
}

export default Inicio;
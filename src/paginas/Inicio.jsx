import { Link } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Card from "../componentes/Card";

function Inicio() {

    const bookTeste = {
        image: "https://picsum.photos/300/400",
        title: "Livro Teste",
        author: "Autor Teste",
        description: "Esse é apenas um livro para testar o card.",
        price: 29.90
    };

    const handleAddToCart = (book) => {
        console.log("Adicionado:", book);
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Ilumine sua Leitura.</h1>

            <p className="mt-4 text-gray-600">
                Descubra uma nova dimensão na leitura digital. Acesso ilimitado aos melhores livros em qualquer lugar.
            </p>

            <div className="flex gap-4 mt-6">
                <BotaoPrimario>Explorar Livros</BotaoPrimario>

                <Link to="/cadastroUsuario">
                    <BotaoSecundario>Criar Conta</BotaoSecundario>
                </Link>
            </div>

            {/* TESTE DO CARD */}
            <div className="mt-10 w-64">
                <Card
                    book={bookTeste}
                    onAddToCart={handleAddToCart}
                />
            </div>

        </div>
    );
}

export default Inicio;
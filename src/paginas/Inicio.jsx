import { Link } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Card from "../componentes/Card";
import bg from "../imagens/FundoInicio.png";

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
        <div className="p-20 min-h-screen bg-no-repeat bg-righ "
            style={{
                backgroundImage: `url(${bg})`, backgroundSize: "1000px", backgroundPosition: "right 35px" // 👈 controla o tamanho
            }}>
            <h1 className="text-3xl font-bold mt-20">Ilumine sua experiência na leitura</h1>

            <p className="mt-4 text-gray-800 " >
                Mais do que uma plataforma, a Lumina é o seu portal para conhecimento, imaginação e descoberta.
            </p>
            <p className="text-gray-800 "> 
                Acesse milhares de livros, leia no seu ritmo e em qualquer lugar. 
            </p> 
            <p className=" text-gray-800 ">
                Descubra novas histórias, aprenda e se inspire todos os dias.
            </p>
            
            

            <div className="flex gap-4 mt-6">
                <BotaoPrimario>Explorar Livros</BotaoPrimario>

                <Link to="/cadastroUsuario">
                    <BotaoSecundario>Criar Conta</BotaoSecundario>
                </Link>
            </div>


            {/* TESTE DO CARD 
            <div className="mt-10 w-64">
                <Card
                    book={bookTeste}
                    onAddToCart={handleAddToCart}
                />
            </div> */}

        </div>
    );
}

export default Inicio;
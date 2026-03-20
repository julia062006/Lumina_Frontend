import { Link } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import Card from "../componentes/Card";
import bg from "../imagens/Livros2.png";


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
        <main className="">
            <div className="p-10 min-h-scren bg-no-repeat bg-righ "
                style={{
                    backgroundImage: `url(${bg})`, backgroundSize: "1000px", backgroundPosition: "right 35px"
                    
                     // 👈 aumenta aqui
                  
                }}>
                <h1 className="text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
                    Ilumine sua <br />
                    <span style={{ color: 'var(--lumina-purple)' }}>Leitura.</span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg gap-2 mt-4">
                    Mais do que uma plataforma, a Lumina é o seu portal para conhecimento, imaginação e descoberta.
                </p>
                <p className="text-lg text-muted-foreground max-w-lg">
                    Acesse milhares de livros, leia no seu ritmo e em qualquer lugar.
                </p>
                <p className="text-lg text-muted-foreground max-w-lg">
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
        </main>
    );
}

export default Inicio;
import "./Header.css";
import logo from "../imagens/LogoCelularLivro.png";
import { User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { BotaoSecundario } from "./Botao";
import { useUsuario } from "../contexto/UsuarioContexto";

export default function Header() {
   
    const { token } = useUsuario();

    return (
        <header className="header">
            <div className="logo">
                <img className="logoCelularLivro" src={logo} alt="Logo Lumina"></img>
                <h1 className="logoTitulo">LUMINA</h1>
            </div>

            <nav className="menu items-center">
                <a href="/inicio">Inicío</a>
                <a href="/biblioteca">Biblioteca</a>
                <a href="/categorias">Categorias</a>
                <a href="/autores">Autores</a>


                {token ? (
                    <>
                        <Link to="/perfil">
                            <User />
                        </Link>
                    </>
                ) : (
                    <Link to="/entrar">
                        <BotaoSecundario>Entrar</BotaoSecundario>
                    </Link>
                )}


                <Link>
                    <ShoppingCart />
                </Link>
            </nav>
        </header>
    );
}
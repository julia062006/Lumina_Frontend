import "./Header.css";
import logo from "../imagens/LogoCelularLivro.png";
import { User, ShoppingCart, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    function sair() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/entrar");
    }

    return (
        <header className="header">
            <div className="logo">
                <img className="logoCelularLivro" src={logo} alt="Logo Lumina"></img>
                <h1 className="logoTitulo">LUMINA</h1>
            </div>

            <nav className="menu">
                <a href="#inicio">Inicío</a>
                <a href="#biblioteca">Biblioteca</a>
                <a href="#categorias">Categorias</a>
                <a href="#autores">Autores</a>


                {token ? (
                    <>
                        <button onClick={sair}>
                            <LogOut />
                        </button>
                    </>
                ) : (
                    <Link to="/entrar">
                        <User />
                    </Link>
                )}


                <Link>
                    <ShoppingCart />
                </Link>
            </nav>
        </header>
    );
}
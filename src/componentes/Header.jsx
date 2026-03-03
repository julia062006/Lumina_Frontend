import "./Header.css";
import logo from "../imagens/LogoCelularLivro.png";

export default function Header() {
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
            </nav>
        </header>
    );
}
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./componentes/Rodape.css";
import Header from "./componentes/Header";
import Rodape from "./componentes/Rodape";
import CadastroUsuario from "./paginas/CadastroUsuario";
import CadastrarAutor from "./paginas/CadastroAutor";
import Entrar from "./paginas/Entrar";
import LivroCategoria from "./paginas/LivroCategoria";
import CadastrarLivro from "./paginas/CadastroLivro";
import Biblioteca from "./paginas/Biblioteca";
import Inicio from "./paginas/Inicio";
import RotaProtegida from "./rotas/RotaProtegida";
import Autores from "./paginas/Autores";
import Perfil from "./paginas/Perfil";
import EditarPerfil from "./paginas/EditarPerfil";

function App() {

  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/cadastroAutor" element={<RotaProtegida><CadastrarAutor /></RotaProtegida>}/>
          <Route path="/cadastroLivro" element={<RotaProtegida><CadastrarLivro /></RotaProtegida>}/>
          <Route path="/entrar" element={<Entrar />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
          <Route path="/editarPerfil" element={<RotaProtegida><EditarPerfil /></RotaProtegida>} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/livros/autor/:id" element={<Biblioteca />} />
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}

export default App;
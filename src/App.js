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

import Inicio from "./paginas/Inicio";
import RotaProtegida from "./rotas/RotaProtegida";
import Perfil from "./paginas/Perfil";

function App() {

  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/cadastroAutor" element={<CadastrarAutor/>}/>
          <Route path="/cadastroLivro" element={<CadastrarLivro/>}/>
          <Route path="/entrar" element={<Entrar />} />
          <Route path="/biblioteca" element={<LivroCategoria />} />
          <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
          <Route path="/inicio" element={<Inicio />} />
          
         
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}

export default App;
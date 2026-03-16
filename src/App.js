import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./componentes/Rodape.css";
import Header from "./componentes/Header";
import Rodape from "./componentes/Rodape";
import CadastroUsuario from "./paginas/CadastroUsuario";
import CadastrarAutor from "./paginas/CadastroAutor";

import Inicio from "./paginas/Inicio";

function App() {

  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/cadastroAutor" element={<CadastrarAutor/>}/>
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}

export default App;
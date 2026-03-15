import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./componentes/Rodape.css";
import Header from "./componentes/Header";
import Rodape from "./componentes/Rodape";
import Cadastro from "./paginas/Cadastro";

import { BotaoCard, BotaoPrimario, BotaoSecundario } from "./componentes/Botao";
import Inicio from "./paginas/Inicio";

function App() {

  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}

export default App;
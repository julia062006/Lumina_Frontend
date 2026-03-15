import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./componentes/Rodape.css";
import Header from "./componentes/Header";
import Rodape from "./componentes/Rodape";
import BookCard from "./componentes/Card"
import Cadastro from "./paginas/Cadastro";

import { BotaoCard, BotaoPrimario, BotaoSecundario } from "./componentes/Botao";

function App() {
  
  return (
    <div>
      <Header />

      <BotaoCard>Ola</BotaoCard>
      <BotaoPrimario>Primário</BotaoPrimario>
      <BotaoSecundario>Secundário</BotaoSecundario>
     
      <Rodape />

      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </div>
  );
}

export default App;
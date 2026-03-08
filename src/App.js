import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from './componentes/Header';
import Cadastro from './paginas/Cadastro';
import Botao, { BotaoCard, BotaoPrimario, BotaoSecundario } from './componentes/Botao';

function App() {
  return (
    <div>
      <Header />
      <BotaoCard>Ola</BotaoCard>
      <BotaoPrimario>Primário</BotaoPrimario>
      <BotaoSecundario>Secundário</BotaoSecundario>
      <Routes>
         <Route path="/cadastro" element={<Cadastro/>}/>
      </Routes>
    </div>
  );
}

export default App;
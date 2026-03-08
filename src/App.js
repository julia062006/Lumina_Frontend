import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from './componentes/Header';
import Cadastro from './paginas/Cadastro';

function App() {
  return (
    <div>
      <Header />
      <Routes>
         <Route path="/cadastro" element={<Cadastro/>}/>
      </Routes>
    </div>
  );
}

export default App;
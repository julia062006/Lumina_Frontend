import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CardAutor({ autor }) {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
      
      {/* Imagem */}
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:3000/uploads/${autor.foto}`}
          alt={autor.nome}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="font-medium mb-1 line-clamp-2">{autor.nome}</h3>

        <p className="text-xs text-gray-500 mb-4 line-clamp-3">
          {autor.biografia}
        </p>

        <button
          onClick={() => navigate(`/livros/autor/${autor.id_autor}`)}
          className="w-full flex items-center justify-center gap-2 bg-[#7573A8] text-white rounded-xl py-2 px-4 text-sm font-medium hover:bg-[#5f5d8f] transition-colors"
        >
          Ver Livros
        </button>
      </div>

    </div>
  );
}

function Autores() {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/autores")
      .then((res) => res.json())
      .then((data) => setAutores(data))
      .catch((err) => console.error("Erro ao buscar autores:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Autores</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {autores.map((autor) => (
          <CardAutor key={autor.id_autor} autor={autor} />
        ))}
      </div>
    </div>
  );
}

export default Autores;
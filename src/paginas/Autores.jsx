import { useEffect, useState } from "react";
import { X } from "lucide-react";

function ModalLivros({ autor, onFechar }) {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/autores/${autor.id_autor}/livros`)
      .then((res) => res.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error("Erro ao buscar livros:", err));
  }, [autor]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Livros de {autor.nome}</h2>
          <button onClick={onFechar} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {livros.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum livro encontrado para este autor.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {livros.map((livro) => (
              <div key={livro.id_livro} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={`http://localhost:3000/uploads/${livro.capa_imagem}`}
                    alt={livro.titulo}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">{livro.titulo}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{livro.descricao}</p>
                  <span className="font-semibold text-sm text-[#7573A8]">
                    R$ {Number(livro.preco).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CardAutor({ autor, onVerLivros }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:3000/uploads/${autor.foto}`}
          alt={autor.nome}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-medium mb-1 line-clamp-2">{autor.nome}</h3>
        <p className="text-xs text-gray-500 mb-4 line-clamp-3">{autor.biografia}</p>
        <button
          onClick={() => onVerLivros(autor)}
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
  const [autorSelecionado, setAutorSelecionado] = useState(null);

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
          <CardAutor
            key={autor.id_autor}
            autor={autor}
            onVerLivros={setAutorSelecionado}
          />
        ))}
      </div>

      {autorSelecionado && (
        <ModalLivros
          autor={autorSelecionado}
          onFechar={() => setAutorSelecionado(null)}
        />
      )}
    </div>
  );
}

export default Autores;
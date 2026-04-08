import { useEffect, useState } from "react";
import { X } from "lucide-react";
import LivroCartao from "../componentes/LivroCartao";
import { BotaoSecundario } from "../componentes/Botao";
import { BotaoPrimario } from "../componentes/Botao";

function mapearLivroParaCartao(livro) {
  return {
    title:       livro.titulo,
    author:      livro.autor?.nome,
    image:       `http://localhost:3000/uploads/${livro.capa_imagem}`,
    description: livro.descricao ?? "",
    urlPdf:      livro.arquivo_pdf ?? "",
  };
}

function ModalAutor({ autor, onFechar }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onFechar();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onFechar]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 flex gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`http://localhost:3000/uploads/${autor.foto}`}
          alt={autor.nome}
          className="w-44 h-64 object-cover rounded-xl shrink-0"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{autor.nome}</h2>
          <p className="text-sm text-gray-600 leading-relaxed flex-1 overflow-y-auto max-h-48 mt-2">
            {autor.biografia}
          </p>
          <button
            onClick={onFechar}
            className="mt-4 w-full py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalLivros({ autor, onFechar }) {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/autores/${autor.id_autor}/livros`)
      .then((res) => res.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error("Erro ao buscar livros:", err));
  }, [autor]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onFechar();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onFechar]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-medium">Livros de {autor.nome}</h2>
          <button onClick={onFechar} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {livros.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum livro encontrado para este autor.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {livros.map((livro) => (
              <LivroCartao
                key={livro.id_livro}
                livro={mapearLivroParaCartao(livro)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CardAutor({ autor, onVerMais, onVerLivros }) {
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
        <h3 className="font-medium mb-4 line-clamp-2">{autor.nome}</h3>
        <div className="flex gap-2">
          <BotaoPrimario
            onClick={() => onVerLivros(autor)}
            className="flex-1 flex justify-center items-center"
          >
            Ver Livros
          </BotaoPrimario>
          <BotaoSecundario 
            onClick={() => onVerMais(autor)}
            className="flex-1 flex justify-center items-center"
          >
            Ver mais
          </BotaoSecundario>
        </div>
      </div>
    </div>
  );
}

function Autores() {
  const [autores, setAutores] = useState([]);
  const [autorModal, setAutorModal] = useState(null);
  const [autorLivros, setAutorLivros] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/autores")
      .then((res) => res.json())
      .then((data) => setAutores(data))
      .catch((err) => console.error("Erro ao buscar autores:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-medium mb-2 text-center">AUTORES</h1>
      <p className="text-muted-foreground mb-10 text-center">Explore todos os autores disponíveis</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {autores.map((autor) => (
          <CardAutor
            key={autor.id_autor}
            autor={autor}
            onVerMais={setAutorModal}
            onVerLivros={setAutorLivros}
          />
        ))}
      </div>

      {autorModal && (
        <ModalAutor
          autor={autorModal}
          onFechar={() => setAutorModal(null)}
        />
      )}

      {autorLivros && (
        <ModalLivros
          autor={autorLivros}
          onFechar={() => setAutorLivros(null)}
        />
      )}
    </div>
  );
}

export default Autores;
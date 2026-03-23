import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function LivroCategoria() {
    const [searchParams] = useSearchParams();
    const categoriaId = searchParams.get("categoria");

    const [livros, setLivros] = useState([]);

    useEffect(() => {
        let url = "http://localhost:3000/livros";

        if (categoriaId) {
            url += `?categoria=${categoriaId}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setLivros(data))
            .catch(err => console.error(err));
    }, [categoriaId]);

    return (
        <div>
            <h1>
                {categoriaId ? "Livros da categoria" : "Biblioteca"}
            </h1>

            {livros.map((livro) => (
                <div key={livro.id}>
                    <h3>{livro.titulo}</h3>
                </div>
            ))}
        </div>
    );
}

export default LivroCategoria;
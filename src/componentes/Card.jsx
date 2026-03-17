import { ShoppingCart } from "lucide-react";
import { BotaoCard } from "./Botao";

export function Card({ book, onAddToCart }) {
  if (!book) return null;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">

      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-medium mb-1 line-clamp-2">{book.title}</h3>

        <p className="text-sm text-gray-500 mb-3">
          {book.author}
        </p>

        <p className="text-xs text-gray-500 mb-4 line-clamp-2">
          {book.description}
        </p>

        <div className="flex items-center justify-between">
          <span
            className="font-semibold text-[#7573A8]">
            R$ {book.price.toFixed(2)}
          </span>

          <BotaoCard
            onClick={() => onAddToCart && onAddToCart(book)}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </BotaoCard>
        </div>
      </div>

    </div>
  );
}

export default Card
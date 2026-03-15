import { ShoppingCart } from 'lucide-react';

 
export default function BookCard({ book, onAddToCart }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-border/40 transition-all hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1">
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-medium mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{book.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="font-medium" style={{ color: 'var(--lumina-purple)' }}>
            R$ {book.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(book)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: 'var(--lumina-purple)' }}
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

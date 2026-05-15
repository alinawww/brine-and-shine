import { Link } from 'react-router-dom';
import type { Ingredient } from '../data/ingredients';

export default function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <Link
      to={`/ingredient/${ingredient.id}`}
      className="group flex flex-col bg-white/60 rounded-xl border border-lavender/20 p-5 hover:border-lavender/60 hover:shadow-md transition-all"
    >
      <h3 className="text-lg text-cosmos group-hover:opacity-80 transition-opacity leading-snug">
        {ingredient.name}
      </h3>
      <p className="mt-1 text-sm text-muted line-clamp-2 leading-relaxed">{ingredient.desc}</p>
    </Link>
  );
}

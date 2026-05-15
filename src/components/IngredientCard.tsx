import { Link } from 'react-router-dom';
import type { Ingredient } from '../data/ingredients';

export default function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <Link
      to={`/ingredient/${ingredient.slug}`}
      className="group flex flex-col bg-cream rounded-xl border border-mustard/20 p-5 hover:border-mustard/60 hover:shadow-md transition-all"
    >
      <span className="text-4xl mb-3">{ingredient.emoji}</span>
      <h3 className="font-display text-lg text-near-black group-hover:text-pickle-green transition-colors leading-snug">
        {ingredient.name}
      </h3>
      <p className="mt-1 text-sm text-muted line-clamp-2 leading-relaxed">{ingredient.intro}</p>
    </Link>
  );
}

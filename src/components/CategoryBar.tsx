import type { Category } from "../types/Category";
import { memo } from "react";
interface CategoryBarProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number) => void;
  error: string | null;
  hasFavorites: boolean;
  favoritesId: number;
}

function CategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
  error,
  hasFavorites,
  favoritesId,
}: CategoryBarProps) {
  if (error) {
    return (
      <div className="text-center p-3 mb-6 text-red-600">
        Erro ao carregar categorias: {error}
      </div>
    );
  }

  const itemsToDisplay: Category[] = hasFavorites
    ? [{ id: favoritesId, name: "Favoritos", position: -1 }, ...categories]
    : [...categories];

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap py-3 mb-6 border-b border-gray-200 hide-scrollbar">
      {itemsToDisplay.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`cursor-pointer inline-block px-4 py-2 text-lg font-medium transition-colors duration-200
            ${
              selectedCategory === category.id
                ? "text-main-red border-b-2 border-main-red font-bold"
                : "text-gray-700 hover:text-main-red"
            }
            last:mr-0 mr-4
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default memo(CategoryBar);

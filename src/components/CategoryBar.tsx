import type { Category } from "../types/Category";

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number) => void;
}

export function CategoryBar({ categories, selectedCategory, onSelectCategory }: CategoryBarProps) {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap py-3 mb-6 border-b border-gray-200 hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`inline-block px-4 py-2 text-lg font-medium transition-colors duration-200
            ${selectedCategory === category.id
              ? 'text-main-red border-b-2 border-main-red font-bold'
              : 'text-gray-700 hover:text-main-red'
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
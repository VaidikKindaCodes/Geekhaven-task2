"use client";

import { Category } from '../../lib/types';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onClick?: () => void;
}

export function CategoryCard({ category, isSelected = false, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl text-center transition-all duration-300 ${
        isSelected
          ? 'bg-blue-500 text-white shadow-lg scale-105'
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md hover:scale-105 text-gray-900 dark:text-white'
      } border border-gray-200 dark:border-gray-700`}
    >
      <div className="text-3xl mb-3">{category.icon}</div>
      <h3 className="font-medium text-sm">{category.name}</h3>
    </button>
  );
}

import React from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = async () => {
  const categories = await getCategories();

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.length > 0 ? (
        categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="cursor-pointer block pb-3 mb-3">
              {category.name}
            </span>
          </Link>
        ))
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
};

export default Categories;

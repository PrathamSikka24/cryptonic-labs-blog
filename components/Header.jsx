import React from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Header = async () => {
  const categories = await getCategories();  // Fetch categories dynamically

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              Cryptonic Labs
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                  {category.name}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-white">No categories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

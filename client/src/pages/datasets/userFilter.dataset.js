import React from 'react';

export default function Category({ currentCategories, category, setCategory }) {
    return (
        <div className="flex justify-center flex-wrap gap-2 my-4">
            <button
                onClick={() => setCategory('all')}
                className={`px-4 py-2 rounded font-semibold ${
                    category === 'all'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                All
            </button>
            {currentCategories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded font-semibold ${
                        category === cat
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

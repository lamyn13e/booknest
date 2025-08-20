import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="bg-cardBg rounded shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-default overflow-hidden">
      <img
        src={book.coverUrl || 'https://via.placeholder.com/200x250?text=No+Image'}
        alt={book.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
        <p className="text-sm text-muted mb-4">{book.author}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">
            {book.price.toLocaleString()}₫
          </span>
          <Link
            to={`/books/${book.id}`}
            className="bg-secondary text-white px-4 py-2 rounded font-medium hover:bg-primary transition duration-default"
          >
            Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

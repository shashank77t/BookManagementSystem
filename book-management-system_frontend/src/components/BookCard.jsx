import React from 'react';

const GENRE_COLORS = {
  Fiction: '#6366f1',
  'Non-Fiction': '#0ea5e9',
  Science: '#10b981',
  Technology: '#f59e0b',
  History: '#ef4444',
  Biography: '#8b5cf6',
  Fantasy: '#ec4899',
  Mystery: '#14b8a6',
  Romance: '#f43f5e',
  'Self-Help': '#84cc16'
};

export default function BookCard({ book, onEdit, onDelete }) {

  const color = GENRE_COLORS[book.genre] || '#6366f1';

  return (
    <div className="book-card">

      <div
        className="book-spine"
        style={{ background: color }}
      />

      <div className="book-content">

        <div className="book-top">

          <span
            className="genre-badge"
            style={{
              background: color + '20',
              color
            }}
          >
            {book.genre}
          </span>

          <span className="book-year">
            {book.year}
          </span>

        </div>

        <h3 className="book-title">
          {book.title}
        </h3>

        <p className="book-author">
          by {book.author}
        </p>

        <div className="book-actions">

          <button
            className="btn-edit"
            onClick={() => onEdit(book)}
          >
            Edit
          </button>

          <button
            className="btn-delete"
            onClick={() => onDelete(book.id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}
import React from 'react';

const GENRES = [
  'All',
  'Fiction',
  'Non-Fiction',
  'Science',
  'Technology',
  'History',
  'Biography',
  'Fantasy',
  'Mystery',
  'Romance',
  'Self-Help'
];

export default function SearchBar({
  search,
  setSearch,
  genre,
  setGenre,
  total,
  filtered
}) {

  return (

    <div className="search-bar">

      {/* SEARCH INPUT */}
      <div className="search-input-wrap">

        <span className="search-icon">
          🔍
        </span>

        <input
          className="search-input"
          placeholder="Search by title or author..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ color: 'black' }}
        />

        {search && (
          <button
            className="clear-btn"
            onClick={() => setSearch('')}
          >
            ✕
          </button>
        )}

      </div>

      {/* GENRE FILTER */}
      <select
        className="genre-select"
        value={genre}
        onChange={e => setGenre(e.target.value)}
        style={{ color: 'black' }}
      >

        {GENRES.map(g => (
          <option
            key={g}
            value={g}
          >
            {g}
          </option>
        ))}

      </select>

      {/* RESULTS */}
      <span className="results-count">
        {filtered} of {total} books
      </span>

    </div>
  );
}
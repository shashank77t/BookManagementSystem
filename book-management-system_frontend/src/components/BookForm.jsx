import React, { useState, useEffect } from 'react';

const GENRES = [
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

const empty = {
  title: '',
  author: '',
  genre: '',
  year: ''
};

export default function BookForm({
  book,
  onSubmit,
  onCancel,
  loading
}) {

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    setForm(
      book
        ? {
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year
          }
        : empty
    );

    setErrors({});

  }, [book]);

  const validate = () => {

    const e = {};

    if (!form.title.trim()) {
      e.title = 'Title is required';
    }

    if (!form.author.trim()) {
      e.author = 'Author is required';
    }

    if (!form.genre) {
      e.genre = 'Genre is required';
    }

    if (
      !form.year ||
      form.year < 1000 ||
      form.year > new Date().getFullYear()
    ) {
      e.year = 'Enter a valid year';
    }

    return e;
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    await onSubmit({
      ...form,
      year: parseInt(form.year)
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>

      <div
        className="modal"
        onClick={e => e.stopPropagation()}
      >

        <div className="modal-header">

          <h2>
            {book ? 'Edit Book' : 'Add New Book'}
          </h2>

          <button
            className="close-btn"
            onClick={onCancel}
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="book-form"
        >

          {/* TITLE */}
          <div className="field">

            <label>Title</label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter book title"
              style={{ color: 'black' }}
            />

            {errors.title && (
              <span className="error">
                {errors.title}
              </span>
            )}

          </div>

          {/* AUTHOR */}
          <div className="field">

            <label>Author</label>

            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Enter author name"
              style={{ color: 'black' }}
            />

            {errors.author && (
              <span className="error">
                {errors.author}
              </span>
            )}

          </div>

          <div className="field-row">

            {/* GENRE */}
            <div className="field">

              <label>Genre</label>

              <select
                name="genre"
                value={form.genre}
                onChange={handleChange}
                style={{ color: 'black' }}
              >

                <option value="">
                  Select genre
                </option>

                {GENRES.map(g => (
                  <option
                    key={g}
                    value={g}
                  >
                    {g}
                  </option>
                ))}

              </select>

              {errors.genre && (
                <span className="error">
                  {errors.genre}
                </span>
              )}

            </div>

            {/* YEAR */}
            <div className="field">

              <label>Publication Year</label>

              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="e.g. 2023"
                min="1000"
                max="9000"
                style={{ color: 'black' }}
              />

              {errors.year && (
                <span className="error">
                  {errors.year}
                </span>
              )}

            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel} style={{color:'green'}}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading
                ? 'Saving...'
                : book
                ? 'Update Book'
                : 'Add Book'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
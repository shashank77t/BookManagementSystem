import React, {
  useState,
  useMemo
} from 'react';

import useBooks from './hooks/useBooks';

import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';

import './App.css';

export default function App() {

  const {
    books,
    loading,
    error,
    addBook,
    editBook,
    removeBook
  } = useBooks();

  const [showForm, setShowForm] = useState(false);

  const [editingBook, setEditingBook] =
    useState(null);

  const [formLoading, setFormLoading] =
    useState(false);

  const [search, setSearch] =
    useState('');

  const [genre, setGenre] =
    useState('All');

  const [toast, setToast] =
    useState(null);

  const [deleteConfirm, setDeleteConfirm] =
    useState(null);

  // TOAST
  const showToast = (
    msg,
    type = 'success'
  ) => {

    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);

  };

  // FILTER BOOKS
  const filteredBooks = useMemo(() => {

    return books.filter(book => {

      const matchSearch =
        !search ||
        book.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        book.author
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchGenre =
        genre === 'All' ||
        book.genre === genre;

      return (
        matchSearch &&
        matchGenre
      );

    });

  }, [books, search, genre]);

  // ADD / EDIT
  const handleSubmit = async (data) => {

    setFormLoading(true);

    try {

      if (editingBook) {

        await editBook(
          editingBook.id,
          data
        );

        showToast(
          'Book updated successfully!'
        );

      } else {

        await addBook(data);

        showToast(
          'Book added successfully!'
        );

      }

      setShowForm(false);
      setEditingBook(null);

    } catch {

      showToast(
        'Something went wrong. Try again.',
        'error'
      );

    } finally {

      setFormLoading(false);

    }

  };

  // EDIT
  const handleEdit = (book) => {

    setEditingBook(book);
    setShowForm(true);

  };

  // DELETE
  const handleDelete = (id) => {

    setDeleteConfirm(id);

  };

  // CONFIRM DELETE
  const confirmDelete = async () => {

    try {

      await removeBook(deleteConfirm);

      showToast('Book deleted.');

    } catch {

      showToast(
        'Failed to delete.',
        'error'
      );

    } finally {

      setDeleteConfirm(null);

    }

  };

  return (

    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="header-inner">

          <div className="logo">

            <span className="logo-icon">
              📚
            </span>

            <div>

              <h1>
                BookShelf
              </h1>

              <p>
                Manage your reading collection
              </p>

            </div>

          </div>

          <button
            className="btn-add"
            onClick={() => {

              setEditingBook(null);
              setShowForm(true);

            }}
          >
            + Add Book
          </button>

        </div>

      </header>

      {/* MAIN */}
      <main className="main">

        <SearchBar
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          total={books.length}
          filtered={filteredBooks.length}
        />

        {/* LOADING */}
        {loading && (

          <div className="state-box">

            <div className="spinner" />

            <p>
              Loading your books...
            </p>

          </div>

        )}

        {/* ERROR */}
        {error && (

          <div className="state-box error-state">

            <span>
              ⚠️
            </span>

            <p>
              {error}
            </p>

          </div>

        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          filteredBooks.length === 0 && (

          <div className="state-box empty-state">

            <span className="empty-icon">
              📖
            </span>

            <p>

              {books.length === 0
                ? 'No books yet. Add your first book!'
                : 'No books match your search.'}

            </p>

          </div>

        )}

        {/* BOOK GRID */}
        <div className="books-grid">

          {filteredBooks.map(book => (

            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          ))}

        </div>

      </main>

      {/* FORM MODAL */}
      {showForm && (

        <BookForm
          book={editingBook}
          onSubmit={handleSubmit}
          onCancel={() => {

            setShowForm(false);
            setEditingBook(null);

          }}
          loading={formLoading}
        />

      )}

      {/* DELETE MODAL */}
      {deleteConfirm && (

        <div
          className="modal-overlay"
          onClick={() => setDeleteConfirm(null)}
        >

          <div
            className="confirm-modal"
            onClick={e => e.stopPropagation()}
          >

            <h3>
              Delete Book?
            </h3>

            <p>
              This action cannot be undone.
            </p>

            <div className="confirm-actions">

              <button
                className="btn-cancel"
                onClick={() => setDeleteConfirm(null)} style={{color:'green'}}
              >
                Cancel
              </button>

              <button
                className="btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

      {/* TOAST */}
      {toast && (

        <div
          className={`toast toast-${toast.type}`}
        >

          {toast.msg}

        </div>

      )}

    </div>

  );

}
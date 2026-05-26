import {
  useState,
  useEffect,
  useCallback
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  getBooks,
  createBook,
  updateBook,
  deleteBook
} from '../api/books';

export default function useBooks() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH BOOKS
  const fetchBooks = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {

      const res = await getBooks();

      setBooks(res.data);

    } catch (err) {

      setError(
        'Failed to load books. Please try again.'
      );

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {

    fetchBooks();

  }, [fetchBooks]);

  // ADD BOOK
  const addBook = async (data) => {

    try {

      const newBook = {
        ...data,
        id: uuidv4()
      };

      const res = await createBook(newBook);

      setBooks(prev => [
        res.data,
        ...prev
      ]);

      return res.data;

    } catch (err) {

      console.error(err);

      throw err;

    }

  };

  // EDIT BOOK
  const editBook = async (id, data) => {

    try {

      const updatedBook = {
        ...data,
        id
      };

      const res = await updateBook(
        id,
        updatedBook
      );

      setBooks(prev =>
        prev.map(book =>
          book.id === id
            ? res.data
            : book
        )
      );

      return res.data;

    } catch (err) {

      console.error(err);

      throw err;

    }

  };

  // DELETE BOOK
  const removeBook = async (id) => {

    try {

      await deleteBook(id);

      setBooks(prev =>
        prev.filter(book =>
          book.id !== id
        )
      );

    } catch (err) {

      console.error(err);

      throw err;

    }

  };

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    editBook,
    removeBook
  };

}
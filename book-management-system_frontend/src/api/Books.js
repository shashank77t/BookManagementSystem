import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL
});

// GET ALL BOOKS
export const getBooks = () => {

  return api.get('/books');

};

// GET SINGLE BOOK
export const getBook = (id) => {

  console.log(id);

  return api.get(`/books/${id}`);

};

// CREATE BOOK
export const createBook = (data) => {

  console.log(data);

  return api.post('/books', data);

};

// UPDATE BOOK
export const updateBook = (id, data) => {

  return api.put(`/books/${id}`, data);

};

// DELETE BOOK
export const deleteBook = (id) => {

  return api.delete(`/books/${id}`);

};
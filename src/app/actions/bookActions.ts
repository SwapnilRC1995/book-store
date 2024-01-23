import { Book } from '@/app/model/Book';

import booksData from '@/app/data/books.json'


export const actionTypes = {
    SET_BOOKS: 'SET_BOOKS',
    FIND_BOOKS: 'FIND_BOOKS',
    ADD_BOOK: 'ADD_BOOK',
    DELETE_BOOK: 'DELETE_BOOK',
    UPDATE_BOOK: 'UPDATE_BOOK',
};

export const setBooks = () => ({
    type: actionTypes.SET_BOOKS,
    payload: booksData,
});

export const findBooks = (title: string) => ({
    type: actionTypes.FIND_BOOKS,
    payload: {
        data: booksData,
        title: title
    },
});

export const addBook = (book: Book) => ({
    type: actionTypes.ADD_BOOK,
    payload: book,
})

export const deleteBook = (book: Book) => ({
    type: actionTypes.DELETE_BOOK,
    payload: book,
})

export const updateBook = (oldBook: Book, newBook: Book) => ({
    type: actionTypes.UPDATE_BOOK,
    payload: {
        old: oldBook,
        new: newBook
    },
})

export type SetBooksAction = ReturnType<typeof setBooks>;
export type FindBooksAction = ReturnType<typeof findBooks>;
export type AddBooksAction = ReturnType<typeof addBook>;
export type DeleteBooksAction = ReturnType<typeof deleteBook>;
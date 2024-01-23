'use client'

import React, {useEffect, useState} from 'react';
import {Book} from "@/app/model/Book";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {deleteBook} from "@/app/actions/bookActions";
import cx from "classnames";
import styles from './index.module.css'
import AddBook from "@/app/components/AddBook";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";

type SortField = 'title' | 'category' | 'price';
type SortOrder = 'asc' | 'dsc';
function BookList(props: any): React.JSX.Element {

    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book>();

    const books: Book[] = useAppSelector(state => state.books)
    const [sortedBooks, setSortedBooks] = useState<Book[]>();
    const [sortField, setSortField] = useState<SortField>('title');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');


    const toggleSortOrder = () => {
        setSortOrder((prevSortOrder: SortOrder) => (prevSortOrder === 'asc' ? 'dsc' : 'asc'));
    };

    const removeBook = (book: Book) => {
        dispatch(deleteBook(book));
    }

    const openUpdateModal = (book: Book) => {
        setIsModalOpen(true);
        setSelectedBook(book);
    }

    useEffect(() => {
        const sortedBooksCopy = [...books];
        if (sortField === 'price') {
            sortedBooksCopy.sort((a: Book, b: Book) => (sortOrder === 'asc' ? a.price.value - b.price.value : b.price.value - a.price.value));
        } else {
            sortedBooksCopy.sort((a: Book, b: Book) => (sortOrder === 'asc' ? a[sortField].localeCompare(b[sortField]) : b[sortField].localeCompare(a[sortField])));
        }
        setSortedBooks(sortedBooksCopy);
    }, [books, sortField, sortOrder]);


    return (
        <main className='px-md-5 px-3 pt-5 pb-2'>
            <h3 className='mb-4'>Books</h3>
            <div className='d-flex justify-content-between mb-3'>
                <label className='w-25 fw-bold'>Name <FontAwesomeIcon icon={faSort} onClick={() => {
                    setSortField('title')
                    toggleSortOrder()
                }}/></label>
                <label className='w-25 fw-bold'>Price <FontAwesomeIcon icon={faSort} onClick={() => {
                    setSortField('price')
                    toggleSortOrder()
                }}/></label>
                <label className='w-25 fw-bold'>Category <FontAwesomeIcon icon={faSort}  onClick={() => {
                    setSortField('category')
                    toggleSortOrder()
                }}/></label>
                <label>Action</label>
            </div>
            {sortedBooks?.map((book: Book, index: number) => {
                return (
                    <div key={index} className={cx('d-flex justify-content-between mb-3', styles.book)}>
                        <label className={cx('w-25', styles.cursorPointer)} onClick={() => openUpdateModal(book)}>{book.title}</label>
                        <label className='w-25'>{book.price?.displayValue} {book.price?.currency}</label>
                        <label className='w-25'>{book.category}</label>
                        <span className='btn btn-danger' onClick={() => removeBook(book)}>Delete</span>
                    </div>
                )
            })}
            <AddBook isModalOpen={isModalOpen} openModal={setIsModalOpen} book={selectedBook}/>
        </main>

    );
}

export default BookList;
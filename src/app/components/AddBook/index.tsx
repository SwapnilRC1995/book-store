'use client'
import React, {useEffect, useState} from 'react';
import cx from "classnames";
import styles from './index.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {Book} from "@/app/model/Book";
import {Price} from "@/app/model/Price";
import {addBook, updateBook} from "@/app/actions/bookActions";

function AddBook(props: any) {

    const [error, setError] = useState('')
    const dispatch = useAppDispatch();
    const books = useAppSelector(state => state.books)
    const addOrUpdateBook = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nameInput: HTMLInputElement | null = document.getElementById('name') as HTMLInputElement
        const categoryInput: HTMLInputElement | null = document.getElementById('category') as HTMLInputElement
        const descriptionInput: HTMLInputElement | null = document.getElementById('description') as HTMLInputElement
        const priceInput: HTMLInputElement | null = document.getElementById('price') as HTMLInputElement

        const name: string | null = nameInput.value
        const category: string | null = categoryInput.value
        const description: string | null = descriptionInput.value
        const price: number | null = parseFloat(priceInput.value)


        const priceData: Price = {
            value: isNaN(price) ? 0 : price,
            displayValue: isNaN(price) ? 'Price unavailable' : price + '',
            currency: isNaN(price) ? '' : 'CAD'
        }
        const book: Book = {
            title: name && name,
            category: category && category,
            description: description && description,
            price: priceData
        }

        if(props.book) {
            const oldBook = books.find((b: Book) => b.title === props.book.title)
            if (name) {
                dispatch(updateBook(oldBook, book))
                props.openModal(false);
            } else {
                setError("Please enter a book name")
            }
        } else{
            if (books.filter((book: Book) => book.title === name).length > 0) {
                setError("Book already exists!");
            } else {
                if (name) {
                    dispatch(addBook(book));
                    props.openModal(false);
                } else {
                    setError("Please enter a book name")
                }
            }
        }
    }

    useEffect(() => {
        if (props.isModalOpen) {
            setError('')
        }
    }, [props.isModalOpen]);

    return (
        <>
            {props.isModalOpen &&
                <div className={cx(styles.modalBackdrop)}>
                    <div className={cx(styles.modalContainer, 'p-4')}>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                            <h3 className='mb-0'>{props.book ? "Update" : "Add"} a book</h3>
                            <FontAwesomeIcon icon={faTimes} className={cx(styles.pointer)}
                                             onClick={() => props.openModal(false)}/>
                        </div>
                        <div>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={(e) => addOrUpdateBook(e)}>
                                <div className='mb-5'>
                                    <label htmlFor="name" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="name"
                                           defaultValue={props.book && props.book.title}/>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <input type="text" className="form-control" id="category"
                                           defaultValue={props.book && props.book.category}/>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description"
                                              defaultValue={props.book && props.book.description}/>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="price" className="form-label">Price(in CAD)</label>
                                    <input type="number" className="form-control" id="price" step={0.01}
                                           defaultValue={props.book && props.book.price.displayValue}/>
                                </div>
                                <div className='d-flex gap-3'>
                                    {props.book ? (
                                        <button type='submit' className="btn btn-primary">Update</button>
                                    ) : (
                                        <>
                                            <button type='reset' className="btn btn-secondary">Reset</button>
                                            <button type='submit' className="btn btn-primary">Add</button>
                                        </>
                                    )}

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default AddBook;
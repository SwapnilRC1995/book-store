'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useAppDispatch} from "@/app/lib/hooks";
import {findBooks} from "@/app/actions/bookActions";
import AddBook from "@/app/components/AddBook";
import styles from './index.module.css'
import cx from "classnames";

function Header(props: any): React.JSX.Element {
    const dispatch = useAppDispatch();

    const [bookName, setBookName] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const findBook = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setBookName(e.currentTarget.value);
    };

    useEffect(() => {
        const searchBooks = async (): Promise<void> => {
            dispatch(findBooks(bookName));
        };

        const debounceSearch = setTimeout(() => {
            searchBooks();
        }, 500);

        return () => clearTimeout(debounceSearch);
    }, [bookName, dispatch]);

    return (
        <>
            <nav className={cx(styles.shadow, "navbar navbar-light bg-light justify-content-sm-between justify-content-center py-3 px-md-5 px-3")}>
                <Link href='/' className="navbar-brand">Book Store</Link>
                <form className="d-flex gap-3" onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault()}>
                    <input className="form-control mr-sm-2 " type="search" placeholder="Find a book"
                           aria-label="Search" onChange={(e: React.ChangeEvent<HTMLInputElement>) => findBook(e)}/>
                    <button className='btn btn-primary w-50' onClick={() => setIsModalOpen(!isModalOpen)}>Add book</button>
                </form>
                <AddBook isModalOpen={isModalOpen} openModal={setIsModalOpen}/>
            </nav>

        </>
    );
}

export default Header;
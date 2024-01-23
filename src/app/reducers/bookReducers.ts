import { actionTypes } from '@/app/actions/bookActions';
import {Book} from "@/app/model/Book";

const initialState: {
    books: Book[]
} = {
    books: [],
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_BOOKS:
            return { ...state, books: action.payload };

        case actionTypes.FIND_BOOKS:
            return { ...state, books: action.payload.data.filter((book: Book) => book.title.includes(action.payload.title))};

        case actionTypes.ADD_BOOK:
            return {...state, books: [action.payload, ...state.books]};

        case actionTypes.DELETE_BOOK:
            return {...state, books: state.books.filter((book: Book) => book.title !== action.payload.title)};

        case actionTypes.UPDATE_BOOK:
            return {...state, books: [action.payload.new, ...state.books.filter((book: Book) => book.title !== action.payload.old.title)]};

        default:
            return state;
    }
};

export default reducer;
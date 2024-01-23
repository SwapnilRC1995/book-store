import Header from "@/app/components/Header";

import React from "react";
import BookList from "@/app/components/BookList";
import Footer from "@/app/components/Footer";

function Home(): React.JSX.Element {

    return (
        <>
            <Header/>
            <BookList/>
            <Footer/>
        </>

    );
}

export default Home;
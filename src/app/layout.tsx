import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";

import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css'
import StoreProvider from "@/app/StoreProvider";

config.autoAddCss = false

const inter = Roboto({
    weight: '400',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: "Book Store",
    description: "A book store like never before",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <StoreProvider>
            <body className={inter.className}>{children}</body>
        </StoreProvider>
        </html>
    );
}

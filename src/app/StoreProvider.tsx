'use client'
import React, { useRef} from 'react'
import {Provider} from 'react-redux'
import {AppStore, makeStore} from '@/app/lib/store'

import {setBooks} from "@/app/actions/bookActions";

export default function StoreProvider({
    children
  }: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()

    if (!storeRef.current) {
        storeRef.current = makeStore();
        storeRef.current?.dispatch(setBooks());
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
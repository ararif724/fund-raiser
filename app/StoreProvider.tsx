'use client';
import { store } from '@/redux/store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

declare global {
    interface Window {
        asset: (endpoint?: string, slash?: boolean) => string;
        route: (endpoint?: string) => string;
        apiUrl: string;
        log: (args: unknown | unknown[]) => void;
    }
}

if (typeof window !== 'undefined') {
    window.asset = (endpoint = '', slash = true) => {
        const url = process.env.NEXT_PUBLIC_ASSET_URL;
        if (!url) return endpoint;

        return url + (slash ? '/' : '') + endpoint;
    };

    window.apiUrl = process.env.NEXT_PUBLIC_API_URL || '/apiv1';
    window.route = (endpoint = '/') => window.apiUrl + endpoint;

    window.log = function (...args) {
        if (process.env.NODE_ENV === 'development') {
            if (args.length <= 1) {
                console.log(args[0]);
            } else console.log(args);
        }
    };
}

export default function StoreProvider({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}

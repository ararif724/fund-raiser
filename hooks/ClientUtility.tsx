'use client';
import { useEffect } from 'react';

export function MakeAlert({
    message,
    state = false,
}: {
    message: string;
    state?: boolean;
}) {
    useEffect(
        function () {
            if (state) alert(message);
        },
        [message, state]
    );
    return <></>;
}

// Server component for reservation page that renders client component with Suspense
import React, { Suspense } from 'react';
import ReservationClient from './ReservationClient';

export const dynamic = 'force-dynamic';

export default function ReservationPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ReservationClient />
        </Suspense>
    );
}
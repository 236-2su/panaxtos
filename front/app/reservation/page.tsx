// Server component for reservation page that renders client component with Suspense
import React, { Suspense } from 'react';
import ReservationList from './components/ReservationList';

export default function ReservationPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ReservationList />
        </Suspense>
    );
}
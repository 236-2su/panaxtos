// NEW FILE: Page wrapper for the Create Reservation Form
import React, { Suspense } from 'react';
import ReservationForm from '../components/ReservationForm';

export default function CreateReservationPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ReservationForm />
        </Suspense>
    );
}

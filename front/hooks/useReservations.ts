import useSWR from 'swr';
import { fetcher } from '../lib/api';

export interface Reservation {
    id: number;
    name: string;
    phone: string;
    dateTime: string;
    notes: string;
    branchId: string;
}

export function useReservations(branchId?: string) {
    const url = branchId
        ? `/api/reservations?branchId=${branchId}`
        : '/api/reservations';

    const { data, error, isLoading, mutate } = useSWR<Reservation[]>(url, fetcher);

    return {
        reservations: data,
        isLoading,
        isError: error,
        mutate
    };
}

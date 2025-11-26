import useSWR from 'swr';
import { fetcher } from '../lib/api';

export interface Review {
    id: number;
    branchId: string;
    author: string;
    title?: string; // 제목 추가
    rating: number;
    comment: string;
    createdAt: string;
}

export function useReviews(branchId?: string) {
    const url = branchId
        ? `/api/reviews?branchId=${branchId}`
        : '/api/reviews';

    const { data, error, isLoading, mutate } = useSWR<Review[]>(url, fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    });

    return {
        reviews: data || [],
        isLoading,
        isError: error,
        mutate
    };
}

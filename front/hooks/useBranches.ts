import useSWR from 'swr';
import { fetcher } from '../lib/api';

export interface Branch {
    id: string;
    name: string;
    directorName: string;
    directorDesc: string;
    directorImg: string;
    address: string;
    mapSrc: string;
}

export function useBranches() {
    const { data, error, isLoading, mutate } = useSWR<Branch[]>('/api/branches', fetcher);

    return {
        branches: data,
        isLoading,
        isError: error,
        mutate
    };
}

export function useBranch(id: string) {
    const { data, error, isLoading, mutate } = useSWR<Branch>(
        id ? `/api/branches/${id}` : null,
        fetcher
    );

    return {
        branch: data,
        isLoading,
        isError: error,
        mutate
    };
}

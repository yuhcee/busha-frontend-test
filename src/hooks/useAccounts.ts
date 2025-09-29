import { useQuery, useMutation, useQueryClient } from 'react-query';

export type Account = {
    id: string;
    currency: string;
    balance: string;
    name: string;
    imgURL: string;
    hold: string;
    pending_balance: string;
    type: string;
    deposit: boolean;
    payout: boolean;
};

export type Wallet = {
    currency: string;
    name: string;
    type: string;
    imgURL: string;
};

const BASEURL = import.meta.env.VITE_BASEURL || "http://localhost:3090";

const fetchAccounts = async (): Promise<Account[]> => {
    const response = await fetch(`${BASEURL}/accounts`);
    if (!response.ok) {
        throw new Error('Network Error');
    }
    return response.json();
};

const fetchWallets = async (): Promise<Wallet[]> => {
    const response = await fetch(`${BASEURL}/wallets`);
    if (!response.ok) {
        throw new Error('Network Error');
    }
    return response.json();
};

const createAccount = async (currency: string): Promise<void> => {
    const response = await fetch(`${BASEURL}/accounts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currency }),
    });
    if (!response.ok) {
        throw new Error('Network Error');
    }
};

export const useAccounts = () => useQuery('accounts', fetchAccounts);
export const useWallets = () => useQuery('wallets', fetchWallets);

export const useAddAccount = () => {
    const queryClient = useQueryClient();
    return useMutation(createAccount, {
        onSuccess: () => {
            queryClient.invalidateQueries('accounts');
        },
    });
};

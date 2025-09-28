import React, { useState, useEffect } from 'react';
import Loader from '../shared/Loader';
type Account = {
    id: number;
    name: string;
    balance: string;
};
const fetchAccounts = ()  : Promise<Account[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                reject(new Error('Network Error'));
            } else {
                resolve([
                    { id: 1, name: 'Bitcoin', balance: '0.0025 BTC' },
                    { id: 2, name: 'Ethereum', balance: '0.05 ETH' },
                ]);
            }
        }, 1500);
    });
};

const AccountList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const loadAccounts = () => {
        setLoading(true);
        setError(null);
        fetchAccounts()
            .then((data) => {
                setAccounts(data as Account[]);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadAccounts();
    }, []);

    if (loading) {
        return <Loader size={84} width={8} />;
    }

    if (error) {
        return (
            <div className="account-list-error">
                <img src="/error-icon.svg" alt="Error Icon" className="error-icon" />
                <div className="error-message">{error}</div>
                <button className="try-again-button" onClick={loadAccounts}>
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="account-list">
            {accounts.map((account: Account) => (
                <div key={account.id} className="account-item">
                    <span>{account.name}</span>
                    <span>{account.balance}</span>
                </div>
            ))}
        </div>
    );
};

export default AccountList;

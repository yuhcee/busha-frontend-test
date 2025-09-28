import React, { useState, useEffect } from 'react';
import Loader from '../shared/Loader';

type Account = {
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

const fetchAccounts = async (): Promise<Account[]> => {
    const response = await fetch('http://localhost:3090/accounts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
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
                setAccounts(data);
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
            {accounts.map((account) => (
                <div key={account.id} className="account-item">
                    <img src={account.imgURL} alt={account.name} />
                    <div className="account-details">
                        <span>{account.name}</span>
                        <span>
                            {account.balance} {account.currency}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccountList;

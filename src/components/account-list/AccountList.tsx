import React, { useState, useEffect } from 'react';
import Loader from '../shared/Loader';
import WalletCard from './WalletCard';

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
    return (
      <div className="status-container">
        <Loader size={84} width={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container">
        <div className="account-list-error">
          <img src="/error-icon.svg" alt="Error Icon" className="error-icon" />
          <div className="error-message">{error}</div>
          <button className="try-again-button" onClick={loadAccounts}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-cards">
        {accounts.map((account) => (
          <WalletCard key={account.id} account={account} />
        ))}
      </div>
  );
};

export default AccountList;

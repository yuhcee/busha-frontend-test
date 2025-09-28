import React, { useState, useEffect } from 'react';
import WalletCard from './WalletCard';
import StatusContainer from '../shared/StatusContainer';
import Modal from '../shared/Modal';
import WalletDetail from './WalletDetail';

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
    throw new Error('Network Error');
  }
  return response.json();
};

const AccountList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

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

  const handleCardClick = (account: Account) => {
    setSelectedAccount(account);
    setDetailModalOpen(true);
  };

  return (
    <>
      <StatusContainer loading={loading} error={error} onRetry={loadAccounts}>
        <div className="wallet-cards">
          {accounts.map((account) => (
            <WalletCard key={account.id} account={account} onClick={handleCardClick} />
          ))}
        </div>
      </StatusContainer>
      <Modal isOpen={isDetailModalOpen}>
        {selectedAccount && <WalletDetail account={selectedAccount} onClose={() => setDetailModalOpen(false)} />}
      </Modal>
    </>
  );
};

export default AccountList;

import React, { useState, useEffect } from 'react';
import StatusContainer from '../shared/StatusContainer';

type Wallet = {
  currency: string;
  name: string;
  type: string;
  imgURL: string;
};

type AddWalletProps = {
  onClose: () => void;
  onWalletAdded: () => void;
};

const fetchWallets = async (): Promise<Wallet[]> => {
  const response = await fetch('http://localhost:3090/wallets');
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};

const createAccount = async (currency: string): Promise<void> => {
  const response = await fetch('http://localhost:3090/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currency }),
  });
  if (!response.ok) {
    throw new Error('Could not create wallet. Please try again.');
  }
};

const AddWalletForm: React.FC<AddWalletProps> = ({ onClose, onWalletAdded }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const loadWallets = () => {
    setLoading(true);
    setError(null);
    fetchWallets()
      .then((data) => {
        setWallets(data);
        if (data.length > 0) {
          setSelectedCurrency(data[0].currency);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWallets();
  }, []);

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setCreateError(null);
    try {
      await createAccount(selectedCurrency);
      onWalletAdded();
      onClose();
    } catch (err: any) {
      setCreateError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="add-wallet-modal">
      <div className="modal-header">
        <h3>Add new wallet</h3>
        <button onClick={onClose} className="modal-close-btn">&times;</button>
      </div>
      <p className="modal-info-text">
        The crypto wallet will be created instantly and be available in your list of wallets.
      </p>
      <StatusContainer loading={loading} error={error} onRetry={loadWallets}>
        <form onSubmit={handleCreateWallet} className="add-wallet-form">
          <label htmlFor="wallet-select" className="select-label">Select wallet</label>
          <select
            id="wallet-select"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="wallet-select"
          >
            {wallets.map((wallet) => (
              <option key={wallet.currency} value={wallet.currency}>
                {wallet.name}
              </option>
            ))}
          </select>
          {createError && <div className="create-error-message">{createError}</div>}
          <button type="submit" disabled={isCreating} className="create-wallet-btn">
            {isCreating ? 'Creating...' : 'Create wallet'}
          </button>
        </form>
      </StatusContainer>
    </div>
  );
};

export default AddWalletForm;
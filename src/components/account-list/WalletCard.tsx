import React from 'react';

type Account = {
  id: string;
  currency: string;
  balance: string;
  name: string;
  imgURL: string;
};

type WalletCardProps = {
  account: Account;
};

const WalletCard: React.FC<WalletCardProps> = ({ account }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    let fallbackSrc = '';
    switch (account.name.toLowerCase()) {
      case 'naira':
        fallbackSrc = '/naira.svg';
        break;
      case 'bitcoin':
        fallbackSrc = '/bitcoin.svg';
        break;
      case 'ethereum':
        fallbackSrc = '/ethereum.svg';
        break;
      case 'stellar':
        fallbackSrc = '/litecoin.svg';
        break;
      default:
        break;
    }
    if (fallbackSrc) {
      event.currentTarget.src = fallbackSrc;
    }
  };

  const formattedBalance =
    account.currency === 'NGN'
      ? parseInt(account.balance, 10).toLocaleString('en-US')
      : account.balance;

  return (
    <div className="wallet-card">
      <div className="wallet-content">
        <div className="coin-symbol-container">
          <img src={account.imgURL} alt={account.name} onError={handleImageError} />
        </div>
        <span className="wallet-name">{account.name}</span>
        <span className="wallet-balance">
          {account.currency === 'NGN' ? `₦${formattedBalance}` : `${formattedBalance} ${account.currency}`}
        </span>
        <div className="chevron-container">
          <img src="/caret.svg" alt="details" className="chevron-icon" />
        </div>
      </div>
    </div>
  );
};

export default WalletCard;

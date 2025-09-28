import React, { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeItem, setActiveItem] = useState('Wallets');
  const navItems = ['Wallets', 'Prices', 'Peer2Peer', 'Activity', 'Settings'];

  return (
    <>
      <div className="top-navbar">
        <div className="top-navbar-content">
          <div className="logo-section">
            <img src="busha-logo-green.svg" alt="Busha Logo" />
          </div>
          <div className="user-profile">
            <div className="avatar">
              <span>O</span>
            </div>
            <span>Oluwatobi Akindunjoye</span>
          </div>
        </div>
      </div>
      <div className="layout">
        <div className="sidebar">
          <div className="nav-items">
            {navItems.map((item) => (
              <button
                key={item}
                className={`nav-item ${activeItem === item ? 'active' : ''}`}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="main-content">
          <div className="main-content-header">
            <h1 className="main-content-title">{activeItem}</h1>
            {activeItem === 'Wallets' && (
              <button className="add-wallet-button">
                + Add new wallet
              </button>
            )}
          </div>
          <div className="title-divider"></div>
          <div className="main-content-body">
            {activeItem === 'Wallets' ? children : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

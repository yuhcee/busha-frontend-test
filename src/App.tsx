import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import AccountList from './components/account-list/AccountList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleWalletAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Layout onWalletAdded={handleWalletAdded}>
      <AccountList key={refreshKey} />
    </Layout>
  );
}

export default App;

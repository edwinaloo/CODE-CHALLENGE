import React, { useState, useEffect } from 'react';
import TransactionsTable from './Transactiontable';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearch = event => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = transactions.filter(
      transaction => transaction.description.toLowerCase().includes(term)
    );

    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = transaction => {
    setTransactions([...transactions, transaction]);
    setFilteredTransactions([...filteredTransactions, transaction]);
  };

  return (
    <div>
      <h1>Transactions</h1>
      <input
        type="text"
        placeholder="Search by description..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <TransactionsTable
        transactions={filteredTransactions}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TransactionsTable({ transactions, onAddTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || description.trim() === '') {
      return;
    }
    const transaction = { description, amount: amountNumber };
    onAddTransaction(transaction);
    setDescription('');
    setAmount('');
  };
const handleAddTransaction = async (transaction) => {
  const response = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  const newTransaction = await response.json();
  setTransactions([...transactions, newTransaction]);
};

  return (
    <section>
      <header>
        <h2>Transactions Table</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.type}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <header>
        <h2>Add Transaction</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  );
}

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddTransaction: PropTypes.func.isRequired,
};

export default TransactionsTable;

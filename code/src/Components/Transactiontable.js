import React, { useState } from 'react';

function TransactionsTable(props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const transaction = { description, amount };
    props.onAddTransaction(transaction);
  }

  return (
    <div>
      <h2>Transactions Table</h2>
      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>Description</th>            
            <th>Amount</th>            
          </tr>
        </thead>
        <tbody>
          {props.transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.type}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" value={description} onChange={event => setDescription(event.target.value)} />
        </label>
        <label>
          Amount:
          <input type="text" value={amount} onChange={event => setAmount(event.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionsTable;

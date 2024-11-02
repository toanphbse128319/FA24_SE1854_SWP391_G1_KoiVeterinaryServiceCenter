import React, { useState } from 'react';

const PaymentStatusPage = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [transactionId, setTransactionId] = useState('');

  // Function to handle payment status update
  const updatePaymentStatus = (status, amount, transactionId) => {
    setPaymentStatus(status);
    setPaymentAmount(amount);
    setTransactionId(transactionId);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>

      {paymentStatus ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">
            {paymentStatus === 'success' ? 'Payment Successful' : 'Payment Failed'}
          </h2>
          <p className="text-gray-600 mb-4">
            Amount: ${paymentAmount.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-4">
            Transaction ID: {transactionId}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">
            No payment status available.
          </p>
        </div>
      )}

      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => updatePaymentStatus('success', 99.99, 'ABC123')}
        >
          Simulate Successful Payment
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => updatePaymentStatus('failure', 99.99, 'DEF456')}
        >
          Simulate Failed Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentStatusPage;

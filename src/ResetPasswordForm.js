import React, { useState } from 'react';

const ResetPasswordForm = () => {
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the reset token and new password to the server
    const response = await fetch('https://react.opositive.io/resetPassword.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resetToken, password }),
    });

    if (response.ok) {
      // Handle success, show a success message to the user
    } else {
      // Handle error, show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Reset Token"
        value={resetToken}
        onChange={(e) => setResetToken(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPasswordForm;

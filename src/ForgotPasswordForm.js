import React, { useState } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the email to the server
    const response = await fetch('https://react.opositive.io/PHPMailer-master/studio-plus/forgotPassword.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgotPasswordForm;

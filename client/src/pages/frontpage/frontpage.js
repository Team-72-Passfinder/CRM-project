import React from 'react';

import './frontpage.css';

function Frontpage() {
  const goToLogin = () => {
    window.location.href = '/login';
  };

  const goToRegister = () => {
    window.location.href = '/register';
  };

  return (
    <div className="Title">
      <h1>Welcome to Citrus Contact!</h1>
      <button onClick={goToLogin}>Go to Login page</button>
      <button onClick={goToRegister}>Register (not implemented)</button>
    </div>
  );
}

export default Frontpage;

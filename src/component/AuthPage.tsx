import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleSignUpClick = () => {
    setShowSignIn(false);
  };

  return (
    <div>
      {showSignIn ? (
        <SignIn onSignUpClick={handleSignUpClick} />
      ) : (
        <SignUp onSignInClick={handleSignInClick} />
      )}
    </div>
  );
};

export default App;
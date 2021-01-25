import React, { useState } from 'react';
import Login from './Login';

import { useSelector } from 'react-redux';
import Account from './Account/Account';
import SignUp from './SignUp';

const AccountDetails = () => {
    const session = useSelector(state => state.session);
    const [isSigningUp, setIsSigningUp] = useState(false);

    if (session) return <Account></Account>;
    return isSigningUp ? <SignUp onChangeToLogin={() => {
            setIsSigningUp(false);
    }}></SignUp> : <Login onChangeToSignUp={() => {
            setIsSigningUp(true);
    }}></Login>;
};

export default AccountDetails;
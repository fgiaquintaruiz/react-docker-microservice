import React from 'react';
import Login from './Login';

import { useSelector } from 'react-redux';
import Account from './Account/Account';

const AccountDetails = () => {
    const session = useSelector(state => state.session);
    if (session) return <Account></Account>;
    return <Login></Login>;
};

export default AccountDetails;
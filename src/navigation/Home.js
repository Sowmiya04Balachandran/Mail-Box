import React from 'react';
import AuthForm from '../auth/AuthForm';
import EmailNavigation from './EmailNavigationBox';

const Home=()=>{
    return (
        <div>
            <EmailNavigation/>
            <AuthForm/>
        </div>
    )
}
export default Home;

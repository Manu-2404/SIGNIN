    import React, { useState } from 'react';
    import AuthPage from './AuthPage';

    interface DashboardProps {
    username: string;
    }


    const DashboardPage: React.FC<DashboardProps> = ({ username }) => {
        const [authenticated, setAuthenticated] = useState(false);
        const OnLogOut = () =>{
            setAuthenticated(true);
        }
        
        if (authenticated) {
            return <AuthPage/>;
        }
    return (
        <div>
        <h1>Welcome, {username}!</h1>
        <p>This is your dashboard.</p>
        <button onClick={OnLogOut}>Log Out</button>
        {/* Add more dashboard content here */}
        </div>
    );
    };

    export default DashboardPage;
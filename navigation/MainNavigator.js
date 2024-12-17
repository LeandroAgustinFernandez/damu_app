import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export default MainNavigator = () => {
    const { user } = useContext(UserContext)
    // console.log('User in MainNavigator:', user);
    return user ? <AppNavigator /> : <AuthNavigator />;
};
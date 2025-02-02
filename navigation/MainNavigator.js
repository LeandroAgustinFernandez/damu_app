import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export default MainNavigator = () => {
    const { user } = useContext(UserContext)
    return user ? <AppNavigator /> : <AuthNavigator />;
};
import { AppStack } from './AppNavigator';
import { AuthStack } from './AuthNavigator';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export default MainNavigator = () => {
    const { user } = useContext(UserContext)
    // console.log('User in MainNavigator:', user);
    return user ? <AppStack /> : <AuthStack />;
};
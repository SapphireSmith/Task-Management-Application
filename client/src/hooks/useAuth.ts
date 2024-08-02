import { useEffect, useState } from 'react';
import {checkAuthentication} from '../utils/authUtils';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = checkAuthentication();
            setIsAuthenticated(authenticated);
        };
        console.log(isAuthenticated);
        checkAuth();
    }, []);

    return isAuthenticated;
};

export default useAuth;

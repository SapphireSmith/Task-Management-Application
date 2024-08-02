import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number; // Token expiration time (in seconds since epoch)
}

const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
};

const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000; // Current time in seconds since epoch
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Token decoding failed:', error);
        return true; // Treat decoding failures as expired tokens
    }
};

const checkAuthentication = (): boolean => {
    const token = getTokenFromLocalStorage();
    if (token) {
        return !isTokenExpired(token); // Token is valid if not expired
    }
    return false; // No token means not authenticated
};

export { checkAuthentication };

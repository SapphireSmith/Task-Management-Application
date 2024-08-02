import { FormEvent, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            toast.success('Login successful!');
            window.location.href = '/dashboard';
        } catch (error: any) {
            console.log(error);
            toast.error(`${error.response?.data.msg || 'login failed.'}`);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh', // Full viewport height
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        type='email'
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Typography component="p" variant="subtitle1">
                        Don't have an account?{' '}
                        <Link href="/register" variant="body2" color="primary">
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;

import { FormEvent, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        if (!name) newErrors.name = 'Full Name is required.';
        if (!email) newErrors.email = 'Email Address is required.';
        if (!password) newErrors.password = 'Password is required.';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required.';
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match.";

        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axiosInstance.post('/api/auth/register', { name, email, password, confirmPassword });
            console.log(response);
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error: any) {
            console.log(error);
            toast.error(`${error.response?.data.msg || 'Registration failed.'}`);
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
                    Register
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Typography component="p" variant="subtitle1" align="center">
                        Have an account?{' '}
                        <Link href="/login" variant="body2" color="primary">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Grid,
    CircularProgress,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';

const BackgroundContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#F0E069",
});

const FormContainer = styled("div")({
    width: "400px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    position: "relative",
});

const LogoImage = styled("img")({
    width: "80px",
    borderRadius: "50%",
    border: "4px solid #EBA53D",
    boxShadow: "0 0 10px rgba(235,,0,0.2)",
    position: "absolute",
    top: "-40px",
    backgroundColor: "#fff",
});

const StyledButton = styled(Button)({
    background: "#EDD78E",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 0",
    borderRadius: "25px",
    marginTop: "20px",
    "&:hover": {
        background: "#EBB467",
    },
});

const StyledTextField = styled(TextField)({
    marginBottom: "20px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
        "& fieldset": {
            borderColor: "#F0E069",
        },
        "&:hover fieldset": {
            borderColor: "#EDD38E",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#EBE43D",
        },
    },
    "& .MuiInputLabel-root": {
        color: "#EDD38E",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#EBE43D",
    },
});

const PaginaLogin = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSwitch = () => {
        setIsRegistering(!isRegistering);
        setErrorMessage('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (isRegistering) {
            if (!username.trim()) {
                setErrorMessage('O nome de usuário é obrigatório');
                setIsLoading(false);
                return;
            }
            if (!validateEmail(email)) {
                setErrorMessage('Email inválido');
                setIsLoading(false);
                return;
            }
            if (!validatePassword(password)) {
                setErrorMessage('A senha deve ter pelo menos 6 caracteres');
                setIsLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                setErrorMessage('As senhas não coincidem');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post('/api/auth/register', {
                    name: username,
                    email,
                    password,
                });

                setIsLoading(false);
                navigate('/dashboard'); 
            } catch (error) {
                setErrorMessage('Erro ao registrar. Tente novamente.');
                setIsLoading(false);
            }

        } else {
            if (!validateEmail(email)) {
                setErrorMessage('Email inválido');
                setIsLoading(false);
                return;
            }
            if (!validatePassword(password)) {
                setErrorMessage('A senha deve ter pelo menos 6 caracteres');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post('/api/auth/login', {
                    email,
                    password,
                });

                const { token } = response.data;
                localStorage.setItem('token', token);
                setIsLoading(false);
                navigate('/dashboard');
            } catch (error) {
                setErrorMessage('Email ou senha incorretos.');
                setIsLoading(false);
            }
        }
    };

    return (
        <BackgroundContainer>
            <FormContainer>
                <LogoImage src="https://via.placeholder.com/80" alt="Logo" />
                <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
                    {isRegistering ? "Registrar" : "Login"}
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                >
                    {isRegistering && (
                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nome de Usuário"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={!!errorMessage && username.trim() === ''}
                            helperText={!!errorMessage && username.trim() === '' ? errorMessage : ''}
                        />
                    )}
                    <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        id={isRegistering ? "emailRegister" : "email"}
                        label="Email"
                        name={isRegistering ? "emailRegister" : "email"}
                        autoComplete="email"
                        autoFocus={!isRegistering}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errorMessage && !validateEmail(email)}
                        helperText={!!errorMessage && !validateEmail(email) ? errorMessage : ''}
                    />
                    <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type={showPassword ? "text" : "password"}
                        id={isRegistering ? "passwordRegister" : "password"}
                        autoComplete={isRegistering ? "new-password" : "current-password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errorMessage && !validatePassword(password)}
                        helperText={!!errorMessage && !validatePassword(password) ? errorMessage : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {isRegistering && (
                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmar Senha"
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!errorMessage && password !== confirmPassword}
                            helperText={!!errorMessage && password !== confirmPassword ? errorMessage : ''}
                        />
                    )}
                    {errorMessage && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <StyledButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : isRegistering ? "Registrar" : "Entrar"}
                    </StyledButton>
                    <Grid container justifyContent="center" sx={{ mt: 3 }}>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={handleSwitch} sx={{ color: "#764ba2" }}>
                                {isRegistering ? "Já tem uma conta? Faça login" : "Não tem uma conta? Registre-se"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </FormContainer>
        </BackgroundContainer>
    );
};

export default PaginaLogin;

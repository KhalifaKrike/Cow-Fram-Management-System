import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import axios from "axios";


export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const navigate = useNavigate();
    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    const auth = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}login`, { email, password });
            if (response.status == 200) {
                setCookie('jwt', response.data.token, 1);
                console.log("yes");
                navigate('/crud');
            } 
        } catch (error) {
            console.error(`Error auth :`, error);
            toast({
                title: 'Error',
                description: 'An error occurred while logging in.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleLogin = () => {
        auth();
        //onLogin();
    }

    return (
        <>
            <Box maxW="400px" mx="auto" mt="100px" p="6" borderWidth="1px" borderRadius="md" boxShadow="md">
                <Heading mb="6">Login</Heading>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl mt="4">
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button mt="6" colorScheme="teal" onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </>
    );
};





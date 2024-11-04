import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const toggle = () => setIsSignIn(!isSignIn);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleLogin = async () => {
    if (!recaptchaToken) {
        setMessage('Please complete the reCAPTCHA verification.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/login', {
            username: form.username,
            password: form.password,
            recaptchaToken: recaptchaToken, // Include the recaptchaToken in the request
        });

        console.log("Full Response:", response); // Log the entire response object
        const { data } = response; // Extract the data

        // Log the data to see its structure
        console.log("Response Data:", data);

        // Set the message from the response
        setMessage(data.message);

        if (data.success) {
            localStorage.setItem('username', form.username);
            setTimeout(() => {
                alert('Session expired, please log in again.');
                navigate('/login');
            }, 3600000);
            Cookies.set('authToken', data.token, { expiresIn: '1h' });
            console.log("Login successful, navigating to dashboard..."); // Check if this line executes
            navigate('/dashboard'); // Navigate to dashboard if login is successful
        } else {
            console.log("Login was not successful:", data.message);
            setMessage(data.message); // Update message with unsuccessful login
        }
    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        const errorMessage = error.response?.data?.message || 'An error occurred during login';
        setMessage(errorMessage); // Set error message for the user
    }
};



    const handleRegister = async () => {
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords don't match!");
            return;
        }
        try {
            const { data } = await axios.post('http://localhost:5000/register', {
                username: form.username,
                email: form.email,
                password: form.password,
            });
            setMessage(data.message);
            toggle();
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred during registration');
        }
    };
const handleGoogleLogin = async (credentialResponse) => {
    try {
        const { data } = await axios.post('http://localhost:5000/google-login', {
            idToken: credentialResponse.credential,
        });
        localStorage.setItem('username', form.username);
        Cookies.set('authToken', data.token, {  expiresIn: '1h' });
        setMessage(data.message);
        setMessage(data.message);
        navigate('/dashboard');
    } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred during Google login');
    }
};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignIn) {
            handleLogin();
        } else {
            handleRegister();
        }
    };
const fetchProtectedData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/protected-route', { withCredentials: true });
        console.log(response.data);
    } catch (error) {
        if (error.response && error.response.data.message === 'Session expired') {
            alert('Your session has expired. Please log in again.');
            navigate('../login');
        } else {
            console.error('Error fetching protected data:', error);
        }
    }
};
    return (
        <div id="login-container" className={`login-container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
            <div className="row">
                {/* Sign Up Section */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <form className="form sign-up" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">Sign up</button>
                            <p>
                                <span className="pointer">Already have an account?</span>
                                <b onClick={toggle} className="pointer">Sign in here</b>
                            </p>
                        </form>
                    </div>
                </div>
                {/* Sign In Section */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <form className="form sign-in" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <ReCAPTCHA
                                sitekey="6Ld2YnMqAAAAACXypAAVxjaSdiztsGvPwSi6hd3X"
                                onChange={(token) => setRecaptchaToken(token)}
                            />
                            <button type="submit">Sign in</button>
                            <p><b className="pointer">OR</b></p>
                            <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={(error) => {
                                console.error('Login Failed:', error);
                                setMessage('Google login failed');
                            }}
                        />
                            <p><b className="pointer">Forgot password?</b></p>
                            <p>
                                <span className="pointer">Don't have an account?</span>
                                <b onClick={toggle} className="pointer">Sign up here</b>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row content-row">
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Welcome Back!</h2>
                        {message && <p>{message}</p>}
                    </div>
                </div>
                <div className="col align-items-center flex-col">
                    <div className="text sign-up">
                        <h2>Join with us</h2>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

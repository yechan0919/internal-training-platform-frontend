import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface LoginProps {}

function Login(props: LoginProps) {
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    async function login(event: FormEvent) {
        event.preventDefault();
        try {
            console.log("User ID:", userId);
            console.log("Password:", password);

            const response = await axios.post("http://localhost:8088/user/login", {
                loginId: userId,
                password: password,
            });

            console.log("Response Data:", response.data);
            console.log("Request Config:", response.config);

            const authorizationHeader = response.headers['authorization'];
            console.log(authorizationHeader);
            console.log("===================");

            const accessToken = response.data.tokenDto.accessToken;
            console.log("accessToken:", accessToken)

            localStorage.setItem("accessToken", accessToken);


        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="w-full max-w-md mx-auto">
                <h2 className="text-3xl font-bold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-sm font-semibold text-gray-600">User ID</label>
                        <input
                            type="text"
                            id="userId"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setUserId(event.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={login}
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-500">Register here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;

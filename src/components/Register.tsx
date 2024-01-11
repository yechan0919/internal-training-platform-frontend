import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import request from "../api/axiosAPI";

interface RegisterProps {}

function Register(props: RegisterProps) {
    const [userId, setUserId] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [department, setDepartment] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function save(event: FormEvent) {
        event.preventDefault();

        if (!userId || !username || !password || !department) {
            alert("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        console.log("Loading state set to true");


        try {
            // Make API request
            request.post('/user/save', {
                userId: userId,
                username: username,
                password: password,
                department: department,
            }).then((res) => {
                if (res.status === 200) {
                    alert("회원가입 성공");
                } else {
                    alert("error : "+ res.status);
                }
                navigate('/login');
            });

        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
            console.log("Loading state set to false");
        }
    }


    return (
        <div className="container mx-auto mt-10">
            <div className="w-full max-w-md mx-auto">
                <div className="card">
                    <h1 className="text-3xl font-bold mb-4">Worker Registration</h1>

                    <form onSubmit={save}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-600">
                                User name
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter Name"
                                value={username}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setUsername(event.target.value);
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="userId" className="block text-sm font-semibold text-gray-600">
                                User ID
                            </label>
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
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                                Password
                            </label>
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

                        <div className="mb-4">
                            <label htmlFor="department" className="block text-sm font-semibold text-gray-600">
                                Department
                            </label>
                            <input
                                type="text"
                                id="department"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter Department"
                                value={department}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setDepartment(event.target.value);
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? "Now Saving..." : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface RegisterProps {}

function Register(props: RegisterProps) {
    const [userId, setUserId] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [department, setDepartment] = useState<string>("");

    // Get the navigate function
    const navigate = useNavigate();

    async function save(event: FormEvent) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8088/user/save", {
                userId: userId,
                username: username,
                password: password,
                department: department,
            });

            alert("User Registration Successfully");

            // Redirect to the login page
            navigate("/login");
        } catch (err) {
            alert(err);
        }
    }


    return (
        <div className="container mx-auto mt-10">
            <div className="w-full max-w-md mx-auto">
                <div className="card">
                    <h1 className="text-3xl font-bold mb-4">Worker Registration</h1>

                    <form>
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
                            className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            onClick={save}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

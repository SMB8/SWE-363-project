import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:54321/api/auth/signin", formData);
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            navigate("/"); // Redirect to home page after successful login
        } catch (err) {
            alert(err.response?.data?.message || "Sign in failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#a0e9ff] to-[#aff1ff]">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Sign in</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.name@kfupm.edu.sa"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="terms" className="text-purple-500" />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the <a href="#" className="text-purple-700 underline">terms of service</a> and <a href="#" className="text-purple-700 underline">privacy policy</a>
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-blue-900 transition">
                        Sign in now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signin;

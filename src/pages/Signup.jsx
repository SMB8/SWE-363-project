import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        studentId: "",
        password: "",
        confirmPassword: "",
        accountType: "Student",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup", {
                fullName: formData.fullName,
                email: formData.email,
                studentId: formData.studentId,
                password: formData.password,
                accountType: formData.accountType,
            });
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Sign up failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#a0e9ff] to-[#aff1ff]">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">KFUPM Email</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student/Staff ID</label>
                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            placeholder="S12345678"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
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
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                        <select
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none"
                        >
                            <option>Student</option>
                            <option>Staff</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="terms" required className="text-purple-500" />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the <a href="#" className="text-purple-700 underline">terms of service</a> and <a href="#" className="text-purple-700 underline">privacy policy</a>
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-blue-900 transition">
                        Sign up now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

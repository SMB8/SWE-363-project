import React from "react";

const Signin = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#a0e9ff] to-[#aff1ff]">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
                {/* <img src="../assets/logo.png" alt="KFUPM Connect Logo" className="mx-auto w-32 mb-4" /> */}
                <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" placeholder="John Doe" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none" />
                    </div>


                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none" />
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
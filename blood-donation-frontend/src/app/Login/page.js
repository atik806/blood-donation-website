import Link from "next/link";

export default function Login() {

  



  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
          Login
        </h2>
        <p className="text-center text-black mb-6">
          Please enter your Username and Password
        </p>

        
        <form className="flex flex-col gap-4">
          
          <div>
            <label className="block mb-1 font-medium text-black">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Login
          </button>

          
          <p className="text-center text-black text-sm">
            Don’t have an account?{" "}
            <Link href="/Signup" className="text-red-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
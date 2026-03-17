import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth"
import { auth } from "../firebase"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      const idToken = await getIdToken(userCredential.user)

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }), // token instead of email & password
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail || "Login failed")
        return
      }

      // localStorage.setItem("role", data.user.role)
      // localStorage.setItem("email", data.user.email)

      navigate("/dashboard")

    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password")
          break
        case "auth/invalid-email":
          setError("Invalid email format")
          break
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.")
          break
        default:
          setError("Cannot connect to server")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold">School System</h1>
      </header>
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              placeholder="Enter your university email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/axios";

function Signup({ switchToLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSumbit = async (e) => {
        e.preventDefault();

        try {
            const respond = await api.post("/auth/signup", {
                username,
                email,
                password
            });

            console.log(respond);
            toast.success("SignUp successful!");
        } catch (error) {
            console.log(error);
            console.log(error.response?.data);
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }

    return (
        <form className="modal-box w-auto" onSubmit={handleSumbit}>
            <fieldset className="fieldset p-5 w-90">
                <legend className="fieldset-legend text-5xl font-instrument font-medium">Sign Up</legend>

                <label className="label text-base-content text-lg font-geist font-semibold">Username</label>
                <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label className="label text-base-content text-lg font-geist font-semibold">Email</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="label text-base-content text-lg font-geist font-semibold">Password</label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? <Eye /> : <EyeClosed />}
                    </button>
                </div>

                <button className="btn btn-neutral mt-5 py-6 text-lg font-normal" type="submit">Sign Up</button>

                <p className="text-sm">Already have an account ?<button onClick={switchToLogin} className="underline cursor-pointer" type="button">Log In</button></p>
            </fieldset>
        </form>
    )
}

export default Signup;
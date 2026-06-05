import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import api from "../utils/axios";
import toast from "react-hot-toast";


function Login({ switchToSignup , onLoginSuccess }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respond = await api.post("/auth/login", {
                email,
                password
            });

            console.log(respond);
            toast.success("Login successful!");
            onLoginSuccess(respond.data.data); 
            document.getElementById('my_modal_2').close();
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
        <form className="modal-box w-auto" onSubmit={handleSubmit}>
            <fieldset className="fieldset p-5 w-90">
                <legend className="fieldset-legend text-5xl font-instrument font-medium">Login</legend>

                <label className="label text-base-content text-lg font-geist font-semibold">Email</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="label text-base-content text-lg font-geist font-semibold">Password</label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? <Eye /> : <EyeClosed />}
                    </button>
                </div>
                <a href="" className="text-sm font-semibold">Forgot Password ?</a>

                <button className="btn btn-neutral mt-5 py-6 text-lg font-normal" type="submit">Login</button>

                <p className="text-sm">Don't have an account ?<button onClick={switchToSignup} className="underline cursor-pointer" type="button">Sign Up</button></p>
            </fieldset>
        </form>
    )
}

export default Login;
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
function Signup({switchToLogin}) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="modal-box w-auto">
            <fieldset className="fieldset p-5 w-90">
                <legend className="fieldset-legend text-5xl font-instrument font-medium">Sign Up</legend>

                <label className="label text-base-content text-lg font-geist font-semibold">Username</label>
                <input type="text" className="input text-lg" placeholder="Username" />

                <label className="label text-base-content text-lg font-geist font-semibold">Email</label>
                <input type="email" className="input text-lg" placeholder="Email" />

                <label className="label text-base-content text-lg font-geist font-semibold">Password</label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} className="input text-lg" placeholder="Password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? <Eye strokeWidth={1.5} /> : <EyeClosed strokeWidth={1.5} />}
                    </button>
                </div>

                <button className="btn btn-neutral mt-5 py-6 text-lg font-normal">Sign Up</button>

                <p className="text-sm">Already have an account ?<button onClick={switchToLogin} className="underline cursor-pointer">Log In</button></p>
            </fieldset>
        </div>
    )
}

export default Signup;
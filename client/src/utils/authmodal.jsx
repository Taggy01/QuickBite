import { useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";

function AuthModal() {
  const [view, setView] = useState("login");

  return (
    <div className="modal modal-open">
      {view === "login" && (
        <Login switchToSignup={() => setView("signup")} />
      )}

      {view === "signup" && (
        <Signup switchToLogin={() => setView("login")} />
      )}
    </div>
  );
}

export default AuthModal;
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
   
    google.accounts.id.initialize({
      client_id: "347256781647-n12rvq41rtc7eqk1lr8hq77u03vi1niu.apps.googleusercontent.com",
      callback: handleCallback,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCallback = async (response) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/google",
        {
          credential: response.credential,
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login with Google</h2>
      <div id="googleBtn"></div>
    </div>
  );
};

export default Login;
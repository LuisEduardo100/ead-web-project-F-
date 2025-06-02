import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HomeAuth() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        navigate("/");
      }
    };
    authenticate();
  }, [token]);

  return (
    <>
      <h1>Hello, você logou na página!</h1>
    </>
  );
}

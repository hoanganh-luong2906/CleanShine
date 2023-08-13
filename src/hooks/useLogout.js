import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const logout = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(apiUrl + "logout");
      if (!res.ok) {
        throw new Error("Error");
      } else {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("refreshToken");
        nav("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, logout };
};

export default useLogout;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./notfound.css";

export default function NotFound() {
  const navigate = useNavigate();
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (time <= 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, navigate]);

  return (
    <div className="notfound">
      <img
        src="360_F_594583957_XRfUZlycOmICMyRt7QPmpnQ0mTnfo5Ct.jpg"
        alt="404 - Not Found"
      />
      <p>Redirecting in {Math.max(time, 0)}...</p>
    </div>
  );
}

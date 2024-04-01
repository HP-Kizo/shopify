import { useNavigate } from "react-router-dom";
const usePath = (path) => {
  const navigate = useNavigate();
  localStorage.setItem("prevPath", path);
  navigate("/login");
};

export default usePath;

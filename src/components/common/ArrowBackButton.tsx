import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ArrowBackButtonProps {
  token?: string | null;
  url?: string | null;
}

export default function ArrowBackButton({ token, url }: ArrowBackButtonProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (!token) {
      navigate("/");
    } else {
      if (url) {
        navigate(url);
        return;
      }
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className="cursor-pointer p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <ArrowBackIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
    </button>
  );
}

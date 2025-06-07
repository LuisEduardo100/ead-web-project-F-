import { memo, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HeaderAuth() {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <header className="max-w-6xl py-3  sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mx-auto gap-3 bg-white ">
      <div className="text-2xl font-bold text-main-red text-center sm:text-left">
        <Link to="/home">Reforço Nota Dez</Link>
      </div>

      <nav className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <div className="relative">
          <nav className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/home"
              className="text-gray-700 hover:text-main-red transition-colors duration-200"
            >
              Início
            </Link>

            <div className="relative" ref={profileMenuRef}>
              {" "}
              <button
                className="w-10 h-10 cursor-pointer rounded-full bg-main-red flex items-center justify-center text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-label="Menu do Perfil"
              >
                P
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Meu Perfil
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
}

export default memo(HeaderAuth);

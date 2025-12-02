// src/components/BottomNav.jsx
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const isProfile = location.pathname === "/profile";

  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center z-20">
      <div className="bg-white rounded-full shadow-[0_12px_30px_rgba(15,23,42,0.15)] px-4 py-2">
        {/* wrapper 2 icon */}
        <div className="relative flex w-40 h-10 items-center justify-between">
          {/* lingkaran biru yang geser */}
          <div
            className="
              absolute top-1/2
              h-10 w-10
              rounded-full
              bg-[#347CFF]
              shadow-[0_10px_20px_rgba(52,124,255,0.45)]
              transition-all duration-300
              ease-[cubic-bezier(0.22,0.61,0.36,1)]
            "
            style={{
              // kalau home aktif → di 25%, kalau profile → di 75%
              left: isHome ? "25%" : "75%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* tombol Home */}
          <NavItem
            to="/home"
            active={isHome}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.293 2.293a1 1 0 0 1 1.414 0l9 9-1.414 1.414L20 11.414V21a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.586l-.293.293L2.293 11.293l9-9Z" />
              </svg>
            }
          />

          {/* tombol Profile */}
          <NavItem
            to="/profile"
            active={isProfile}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a5 5 0 0 0-1 9.9V13H9a5 5 0 0 0-5 5v2h16v-2a5 5 0 0 0-5-5h-2v-1.1A5 5 0 0 0 12 2Z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, active, icon }) {
  return (
    <Link
      to={to}
      className="relative flex-1 flex items-center justify-center z-10"
    >
      <span
        className={`
          transition-all duration-300
          ease-[cubic-bezier(0.22,0.61,0.36,1)]
          ${active ? "text-white scale-110" : "text-slate-900 hover:scale-110"}
        `}
      >
        {icon}
      </span>
    </Link>
  );
}

export default BottomNav;

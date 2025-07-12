import React from "react";
import { Home, BookOpen, PlusCircle, List } from "lucide-react";
import { Link } from "react-router";

const Navbar: React.FC = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Books", path: "/books", icon: <BookOpen size={20} /> },
    { name: "Add Book", path: "/books/add", icon: <PlusCircle size={20} /> },
    {
      name: "Borrow Summary",
      path: "/borrow-summary",
      icon: <List size={20} />,
    },
  ];

  return (
    <nav className="absolute w-full z-30 bg-gray-900 opacity-75">
      <ul className="flex items-center justify-center space-x-4 sm:space-x-8 py-3">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="flex items-center space-x-1 text-gray-100 hover:text-blue-500"
            >
              {item.icon}
              <span className="hidden sm:inline text-sm font-medium">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="p-4 grid grid-cols-2">
      <p className="text-lg font-bold">Lyz Studios</p>

      <ul className="uppercase flex gap-3 justify-end">
        <li>Sites</li>
        <li>Blog</li>
        <li>Portfolio</li>
      </ul>
    </nav>
  );
};

export default NavBar;

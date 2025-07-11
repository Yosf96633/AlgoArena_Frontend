import { Link, NavLink } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
const Header = () => {
  return (
    <header className=" flex justify-between px-6 py-3 border-b-[1px] items-center sticky top-0 z-50 backdrop-blur-xl">
      <Link to={'/'}>
      <h1 className=" font-mono text-xl font-bold">&lt;AlgoArena/&gt;</h1>
      </Link>
      <nav className=" space-x-8 text-[14.5px] max-md:hidden">
        <NavLink className={` py-1`} to={"/problems"}>Problems</NavLink>
        <NavLink className={` py-1`} to={"/about"}>About</NavLink>
        <NavLink className={` py-1`} to={"/leaderboard"}>Leaderboard</NavLink>
      </nav>
      <div className=" flex space-x-4 items-center max-md:hidden">
        <div className=" space-x-4">
          <Link to={'/sign-up'}>
           <Button className=" cursor-pointer">Sign up</Button>
          </Link>
           <Link to={'/login'}>
           <Button className=" cursor-pointer">Login</Button>
          </Link>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className=" md:hidden">
        <Menu/>
      </div>
    </header>
  );
};

export default Header;

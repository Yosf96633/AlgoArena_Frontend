import { Link, NavLink } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";
const Header = () => {
  const { user, loading } = useAuth();
  const handleLogout = async () => {
       try {
             const {error} = await supabase.auth.signOut();
             if(error){
              toast.error(error.message);
             }
       } catch (error) {
            console.log("Error while logout," , error);
            toast.error("Error while logout")
       }
  }
  return (
    <header className=" flex justify-between px-6 py-3 border-b-[1px] items-center sticky top-0 z-50 backdrop-blur-xl">
      <Link to={"/"}>
        <h1 className=" font-mono text-xl font-bold">&lt;AlgoArena/&gt;</h1>
      </Link>
      <nav className=" space-x-8 text-[14.5px] max-md:hidden">
        <NavLink className={` py-1`} to={"/problems"}>
          Problems
        </NavLink>
        <NavLink className={` py-1`} to={"/about"}>
          About
        </NavLink>
        <NavLink className={` py-1`} to={"/leaderboard"}>
          Leaderboard
        </NavLink>
      </nav>
      <div className=" flex space-x-4 items-center max-md:hidden">
       {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>
                {user.user_metadata?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <div className="px-3 py-2 text-sm text-muted-foreground">
              <p>{user.user_metadata?.username ?? "Anonymous"}</p>
              <p className="text-xs">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="space-x-4">
          <Button className=" cursor-pointer">
               <Link to={'/sign-up'}>Sign up</Link>
          </Button>
          <Button className=" cursor-pointer">
               <Link to={'/login'}>Login</Link>
          </Button>
        </div>
      )}
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className=" md:hidden">
        <Menu />
      </div>
    </header>
  );
};

export default Header;

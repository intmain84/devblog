"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Bookmark,
  LogOut,
  Pencil,
  Shield,
  User,
  UserRound,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const UserButton = () => {

  const { data: session, status, update } = useSession();
  const avatarUrl = session?.user.image || ""
  const isLoggedIn = status === "authenticated";
  const pathname = usePathname();

  console.log("Avatar>>>>:", avatarUrl);

  useEffect(() => {
    if (!isLoggedIn && pathname) {
      const updateSession = async () => { await update(); }
      updateSession();
    }
  }, [pathname]);

  if (session && status === "authenticated") {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="border-2 border-slate-500 dark:border-slate-50">
              <UserRound />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button className="flex items-center gap-2">
              <User size={18} /> Profile
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button className="flex items-center gap-2">
              <Pencil size={17} /> Create Post
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button className="flex items-center gap-2">
              <Bookmark size={18} /> Bookmark
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button className="flex items-center gap-2">
              <Shield size={18} /> Admin
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button className="flex items-center gap-2" onClick={() => signOut()}>
              <LogOut size={18} /> Log Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return null;
  }
};

export default UserButton;

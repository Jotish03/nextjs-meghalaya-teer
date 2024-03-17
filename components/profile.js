import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

const Profile = () => {
  const { data: session, status } = useSession();

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };
  return (
    <main className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src="/images/user.png" className="invert" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Administrator</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Hi, {session?.user?.name}</DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <div className=" text-left" onClick={handleLogout}>
              <p>Logout</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
};

export default Profile;

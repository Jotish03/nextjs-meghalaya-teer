import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Profile from "../profile";
import Image from "next/image";

const NavigationBar = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  // const handleLoginButtonRoute = () => {
  //   router.push("/user-auth/user-login");
  // };

  return (
    <main className="flex items-center justify-between lg:justify-around p-4 bg-[#212529] ">
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <Image
            src={"/images/teerlogo.png"}
            width={40}
            height={40}
            priority
            className="dark:invert"
            alt="logo"
          />
        </Link>
        <Link href={"/"}>
          <span className="text-center font-bold text-white">
            Morning Sunday Teer
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {session && (
          <>
            <Profile />
          </>
        )}
      </div>
    </main>
  );
};

export default NavigationBar;

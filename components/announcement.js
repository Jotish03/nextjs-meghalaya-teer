import React from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const Announcement = () => {
  const { data: session, status } = useSession();
  return (
    <main className="flex flex-col items-center justify-center gap-4 p-6">
      <div className="text-center">
        <h4 className="text-lg font-medium leading-none">
          Meghalaya Sunday Teer Announcement
        </h4>
      </div>
      <Separator className="my-2 w-48" />
      <div className="flex justify-center items-center text-sm mb-4 lg:mb-0">
        {session ? (
          <form className="flex flex-col items-center ">
            <Textarea className="w-[330px]  md:w-[410px] lg:w-[870px]" />
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button>
                <IoMdAdd size={20} />
              </Button>
              <Button variant="destructive">
                <MdDeleteOutline size={20} />
              </Button>
            </div>
          </form>
        ) : (
          <div className="w-[330px]  md:w-[410px] lg:w-[870px] text-center">
            <h1 className="mt-[-15px] ">No new announcement </h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default Announcement;

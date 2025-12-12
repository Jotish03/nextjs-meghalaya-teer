import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PreviousCardHolder from "./previous-card-holder";

const PreviousList = () => {
  return (
    <main className="flex flex-col justify-center gap-2 p-2">
      <div className="text-center">
        <h1 className="font-bold text-center pt-6">
          Meghalaya Previous Results
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="my-4 w-[300px] " />
      </div>

      <div className="flex flex-wrap flex-col md:flex-row justify-center items-center gap-2 lg:gap-2 sm:gap-1 md:gap-2 ">
        <Link href={"/previous-result"}>
          <PreviousCardHolder
            url="/images/pmorning.webp"
            title={"Previous Morning Result"}
          />
        </Link>
        {/* Noon and Evening previous results are hidden for all users */}
      </div>
    </main>
  );
};

export default PreviousList;

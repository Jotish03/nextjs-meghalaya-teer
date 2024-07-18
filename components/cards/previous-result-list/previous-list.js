import React from "react";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import CardHolder from "../cardholder";

const PreviousList = () => {
  return (
    <main className="flex  flex-col justify-center gap-2 p-2 mb-[250px] lg:mb-[180px] ">
      <div className="text-center">
        <h1 className="font-bold text-center pt-6">
          Meghalaya Previous Results
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <Separator className="my-4 w-[300px] " />
      </div>

      <div className="flex flex-wrap  justify-center gap-2 lg:gap-2 sm:gap-1 md:gap-2 ">
        <Link href={"/previous-result"}>
          <CardHolder
            url="/images/pmorning.webp"
            title={"Previous Morning Result"}
            height={225}
            width={349}
          />
        </Link>
        <Link href={"/previous-result-noon"}>
          <CardHolder url="/images/pnoon.webp" title={"Previous Noon Result"} />
        </Link>
        <Link href={"/previous-result-eve"}>
          <CardHolder url="/images/peve.webp" title={"Previous Eve Result"} />
        </Link>
      </div>
    </main>
  );
};

export default PreviousList;

import Link from "next/link";
import React from "react";
import CardHolder from "./cardholder";

const BottomCard = () => {
  return (
    <main className="flex justify-center items-center mt-8">
      <div className="flex  justify-center gap-1 lg:gap-2 sm:gap-1 md:gap-2">
        <Link href={"/common-number"}>
          <CardHolder url="/images/commonnumber.jpg" title={"Common Number"} />
        </Link>
        <Link href={"/previous-result"}>
          <CardHolder
            url="/images/previousresults.jpg"
            title={"Previous Result"}
          />
        </Link>
        <Link href={"/dream-number"}>
          <CardHolder url="/images/dreamnumber.jpg" title={"Dream Number"} />
        </Link>
      </div>
    </main>
  );
};

export default BottomCard;

import React from "react";
import CardHolder from "./cardholder";
import Link from "next/link";

const CardList = () => {
  return (
    <main className="flex flex-col justify-center gap-2 p-2">
      <div className="flex justify-center gap-1 lg:gap-2 sm:gap-1 md:gap-2">
        <Link href="/common-number">
          <CardHolder
            url="/images/commonmorning.webp"
            title="Common Number Morning"
          />
        </Link>
        <Link href="/previous-result">
          <CardHolder
            url="/images/previousresults.webp"
            title="Previous Result"
          />
        </Link>
        <Link href="/dream-number">
          <CardHolder url="/images/dreamnumber.webp" title="Dream Number" />
        </Link>
      </div>
      <div className="flex justify-center gap-1 lg:gap-2 sm:gap-1 md:gap-2">
        <Link href="#">
          <CardHolder url="/images/analytics.webp" title="Analytics" />
        </Link>
        <Link href="#">
          <CardHolder url="/images/teercalendar.webp" title="Teer Calendar" />
        </Link>
        <Link href="#">
          <CardHolder url="/images/reputedcounter.webp" title="Common Number" />
        </Link>
      </div>
      {/* Champions card is hidden to maintain 3x2 grid layout */}
    </main>
  );
};

export default CardList;

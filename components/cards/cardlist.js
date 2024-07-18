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
        <Link href="/common-number-noon">
          <CardHolder
            url="/images/commonnoon.webp"
            title="Common Number Noon"
          />
        </Link>
        <Link href="/common-number-eve">
          <CardHolder
            url="/images/commonevening.webp"
            title="Common Number Evening"
          />
        </Link>
      </div>
      <div className="flex justify-center gap-1 lg:gap-2 sm:gap-1 md:gap-2">
        <Link href="#">
          <CardHolder url="/images/analytics.webp" title="Analytics" />
        </Link>
        <Link href="/dream-number">
          <CardHolder url="/images/dreamnumber.webp" title="Dream Number" />
        </Link>
        <Link href="/previous-list">
          <CardHolder
            url="/images/previousresults.webp"
            title="Previous Result"
          />
        </Link>
      </div>
      <div className="flex justify-center gap-1 lg:gap-2 sm:gap-1 md:gap-2">
        <Link href="#">
          <CardHolder url="/images/teercalendar.webp" title="Teer Calendar" />
        </Link>
        <Link href="#">
          <CardHolder url="/images/reputedcounter.webp" title="Common Number" />
        </Link>
        <Link href="#">
          <CardHolder url="/images/champions.webp" title="Champions" />
        </Link>
      </div>
    </main>
  );
};

export default CardList;

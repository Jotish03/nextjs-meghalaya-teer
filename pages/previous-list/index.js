import React from "react";
import Head from "next/head";
import PreviousList from "@/components/cards/previous-result-list/previous-list";

const PreviousResultList = () => {
  return (
    <>
      <Head>
        <title>Previous Teer Results - Meghalaya Teer Result</title>
        <meta
          name="description"
          content="Check out the previous Meghalaya Teer results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta
          name="keywords"
          content="teer, meghalaya teer, teers , previous list , list , result of morning teer , result of noon teer, result of evening teer, results list, list of teer, previous result list , teer result, previous teer result, teer result history, teer result archive"
        />
        <meta name="author" content="Meghalaya Teer Result Archive" />
        <meta
          property="og:title"
          content="Previous Teer Results - Meghalaya Teer Result"
        />
        <meta
          property="og:description"
          content="Check out the previous Meghalaya Teer results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.meghalayasundayteer.com/previous-result-list"
        />
      </Head>
      <main>
        <PreviousList />
      </main>
    </>
  );
};

export default PreviousResultList;

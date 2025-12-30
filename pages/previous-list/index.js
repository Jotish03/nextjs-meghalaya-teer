import React from "react";
import Head from "next/head";
import PreviousList from "@/components/cards/previous-result-list/previous-list";

const PreviousResultList = () => {
  return (
    <>
      <Head>
        <title>Previous Teer Results - Morning Sunday Teer Result</title>
        <meta
          name="description"
          content="Check out the previous Morning Sunday Teer results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta
          name="keywords"
          content="teer, morning sunday teer, teers , previous list , list , result of morning teer , result of noon teer, result of evening teer, results list, list of teer, previous result list , teer result, previous teer result, teer result history, teer result archive"
        />
        <meta name="author" content="Morning Sunday Teer Result Archive" />
        <meta
          property="og:title"
          content="Previous Teer Results - Morning Sunday Teer Result"
        />
        <meta
          property="og:description"
          content="Check out the previous Morning Sunday Teer results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://morningsundayteer.today/previous-result-list"
        />
      </Head>
      <main>
        <PreviousList />
      </main>
    </>
  );
};

export default PreviousResultList;

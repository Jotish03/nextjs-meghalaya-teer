import Head from "next/head";
import CardList from "@/components/cards/cardlist";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section/herosection";
import { useState, useEffect } from "react";

import Loading from "./loading";

const Home = () => {
  return (
    <>
      <Head>
        <title>Meghalaya Teer - Teer Result All Over India</title>
        <meta
          name="description"
          content="Shillong Teer provides teer results from various regions across India. Stay updated with the latest teer results."
        />
        <meta
          name="keywords"
          content="teer, shillong teer, teer result, teer result today, teer result online, teer result india"
        />
        <meta name="author" content="Shillong" />
        <meta
          property="og:title"
          content="Shillong Teer - Teer Result All Over India"
        />
        <meta
          property="og:description"
          content="Shillong Teer provides teer results from various regions across India. Stay updated with the latest teer results."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.shillongmorningsundayresult.com/"
        />
        {/* Add more meta tags as needed */}
      </Head>

      <main>
        <HeroSection />
        <CardList />
      </main>
    </>
  );
};

export default Home;

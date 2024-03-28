import Head from "next/head";
import CardList from "@/components/cards/cardlist";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section/herosection";

const Home = () => {
  return (
    <>
      <Head>
        <title>
          Meghalaya Teer Results Today & Across India | Fastest Updates
        </title>
        <meta
          name="description"
          content="Get the fastest Meghalaya Teer results for today and all regions in India. Stay ahead of the game with the latest teer numbers at your fingertips."
        />
        <meta
          name="keywords"
          content="Meghalaya Teer, teer results, today's teer results, meghalaya teer, Khanapara Teer, Jowai Teer, archery betting, India teer results"
        />
        <meta name="author" content="Meghalaya Teer Results" />
        <meta
          property="og:title"
          content="Meghalaya Teer Results Today & Across India | Fastest Updates"
        />
        <meta
          property="og:description"
          content="Get the fastest Meghalaya Teer results for today and all regions in India. Stay ahead of the game with the latest teer numbers at your fingertips."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="www.meghalayasundayteer.com/" />
      </Head>

      <main>
        <HeroSection />
        <CardList />
      </main>
    </>
  );
};

export default Home;

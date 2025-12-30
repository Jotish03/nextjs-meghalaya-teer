import Head from "next/head";
import CardList from "@/components/cards/cardlist";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section/herosection";

const Home = () => {
  return (
    <>
      <Head>
        <title>Morning Sunday Teer Results Today | Fastest Updates</title>
        <meta
          name="description"
          content="Get the fastest Morning Sunday Teer results for today. Stay ahead of the game with the latest teer numbers at your fingertips."
        />
        <meta
          name="keywords"
          content="Morning Sunday Teer, teer results, today's teer results, morning teer, Khanapara Teer, Jowai Teer, archery betting, India teer results"
        />
        <meta name="author" content="Morning Sunday Teer Results" />
        <meta
          property="og:title"
          content="Morning Sunday Teer Results Today | Fastest Updates"
        />
        <meta
          property="og:description"
          content="Get the fastest Morning Sunday Teer results for today. Stay ahead of the game with the latest teer numbers at your fingertips."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://morningsundayteer.today/" />
      </Head>

      <main>
        <HeroSection />
        <CardList />
      </main>
    </>
  );
};

export default Home;

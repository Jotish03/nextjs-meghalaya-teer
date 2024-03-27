import BottomCard from "@/components/cards/cardbottom";
import DreamMeanings from "@/components/meaning";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Head from "next/head";

const TableDemo = () => {
  return (
    <>
      <Head>
        <title>Dream Number Analysis - Meghalaya Teer Result</title>
        <meta
          name="description"
          content="Explore dream number meanings associated with Meghalaya Teer results and interpretations. Stay informed with analyses from various teer regions in India."
        />
        <meta
          name="keywords"
          content="teer, meghalaya teer, dreams, dream number result, dream number list, what is dream number, what is dream number in teer, what is dream number in teer games, dream data, dream numbers, dream number, dream number analysis, teer result analysis, teer result interpretation"
        />
        <meta
          name="author"
          content="Meghalaya Teer Dream Number Analysis List"
        />
        <meta
          property="og:title"
          content="Dream Number Analysis - Meghalaya Teer Result"
        />
        <meta
          property="og:description"
          content="Explore dream number meanings associated with Meghalaya Teer results and interpretations. Stay informed with analyses from various teer regions in India."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.meghalayasundayteer.com/dream-number"
        />
      </Head>

      <main className="flex items-center justify-center p-1 m-8">
        <Table>
          <TableCaption>A list of your dream meanings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Dream</TableHead>
              <TableHead>Direct</TableHead>
              <TableHead>House</TableHead>
              <TableHead>Ending</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DreamMeanings.map((dream) => (
              <TableRow key={dream.direct}>
                <TableCell>{dream.dream}</TableCell>
                <TableCell>{dream.direct}</TableCell>
                <TableCell>{dream.house}</TableCell>
                <TableCell>{dream.ending}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <BottomCard />
    </>
  );
};

export default TableDemo;

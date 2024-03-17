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
        <title>Dream Number Analysis - Shillong Teer Result</title>
        <meta
          name="description"
          content="Explore the dream numbers associated with previous Shillong Teer results along with analyses from other teer regions in India. Stay informed with dream number interpretations."
        />
        <meta
          name="keywords"
          content="teer, shillong teer, dream number, dream number analysis, teer result analysis, teer result interpretation"
        />
        <meta
          name="author"
          content="Shillong Teer Dream Number Analysis Team"
        />
        <meta
          property="og:title"
          content="Dream Number Analysis - Shillong Teer Result"
        />
        <meta
          property="og:description"
          content="Explore the dream numbers associated with previous Shillong Teer results along with analyses from other teer regions in India. Stay informed with dream number interpretations."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.shillongmorningsundayresult.com/dream-number"
        />
        {/* Add more meta tags as needed */}
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

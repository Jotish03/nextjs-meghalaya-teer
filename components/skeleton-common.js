import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SkeletonCommon = () => {
  const numRows = 10;
  return (
    <main className="flex flex-col items-center justify-center gap-18 mt-32 p-4 ">
      <section className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-6">
        <Table>
          <TableCaption>
            <Skeleton className="h-4 w-full" />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 4 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 md:h-4 w-full " />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

export default SkeletonCommon;

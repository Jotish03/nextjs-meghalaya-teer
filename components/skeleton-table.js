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

const SkeletonTable = () => {
  const numRows = 10;
  return (
    <main className="flex items-center justify-center mt-8 p-4 sm:p-0 lg:px-24">
      <section className="w-full ">
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

export default SkeletonTable;

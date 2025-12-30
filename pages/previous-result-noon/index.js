import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import SkeletonTable from "@/components/skeleton-table";
import NotificationContext from "@/store/notification-store";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import Head from "next/head";
import BottomCard from "@/components/cards/cardbottom";

const PreviousResult = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const notificationctx = useContext(NotificationContext);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const resultsPerPage = 10;

  const fetchResults = async () => {
    const response = await axios.get("/api/previousresultnoon");
    return response.data.reverse();
  };

  const { data: results, isLoading } = useQuery(
    "previousNoonResults",
    fetchResults,
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`/api/noon-id/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("previousNoonResults");
        notificationctx.showNotification({
          title: "Noon Result Deleted Successfully",
          description: "Data deleted!",
          variant: "destructive",
        });
        setDeletingId(null);
      },
      onError: (error) => {
        notificationctx.showNotification({
          title: "Error!",
          description: error.message || "Error has occurred",
          variant: "destructive",
        });
        setDeletingId(null);
      },
    }
  );

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      await router.push("/add-result-noon");
    } catch (error) {
      console.error("Error navigating to add result page:", error);
    }
  };

  const handleDelete = async (_id) => {
    setDeletingId(_id);
    deleteMutation.mutate(_id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  const totalResults = results?.length || 0;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, totalResults);

  return (
    <>
      <Head>
        <title>Noon Previous Teer Results - Morning Sunday Teer Result</title>
        <meta
          name="description"
          content="Check out the previous Morning Sunday Teer noon results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta
          name="keywords"
          content="teer, morning sunday teer, noon previous result, noon result, noon results, noon previous results, noon ,  teer result, previous teer result, teer result history, teer result archive"
        />
        <meta name="author" content="Morning Sunday Teer Result Archive" />
        <meta
          property="og:title"
          content="Noon Previous Teer Results - Morning Sunday Teer Result"
        />
        <meta
          property="og:description"
          content="Check out the previous Morning Sunday Teer noon results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://morningsundayteer.today/previous-result-noon"
        />
      </Head>

      <section className="flex items-center justify-center mt-10">
        {session ? (
          <Button type="button" onClick={handleAddResult}>
            Add Previous Result
          </Button>
        ) : (
          <div className="font-bold">
            <h1>Afternoon Previous Result</h1>
          </div>
        )}
      </section>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <main className="flex items-center justify-center mt-8 p-4 sm:p-0 lg:px-24">
          <Table>
            <TableCaption>Afternoon Previous Result</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">City</TableHead>
                <TableHead className="text-black">Date</TableHead>
                <TableHead className="text-black">F/R</TableHead>
                <TableHead className="text-black">S/R</TableHead>
                {session && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {results?.slice(startIndex, endIndex).map((result) => (
                <TableRow key={result._id}>
                  <TableCell>{result.city}</TableCell>
                  <TableCell>{formatDate(result.date)}</TableCell>
                  <TableCell>{result.fr}</TableCell>
                  <TableCell>{result.sr}</TableCell>
                  {session && (
                    <TableCell className="sm:w-auto">
                      <div>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(result._id)}
                          disabled={deletingId === result._id}
                        >
                          {deletingId === result._id ? (
                            <ClipLoader
                              size={20}
                              color={"#fff"}
                              loading={true}
                            />
                          ) : (
                            <MdDeleteOutline size={20} />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      )}

      {totalPages > 1 && (
        <section className="mt-10 mb-8">
          <Pagination>
            <PaginationContent className="cursor-pointer">
              {currentPage !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />
                </PaginationItem>
              )}

              {currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </section>
      )}
      <BottomCard />
    </>
  );
};

export default PreviousResult;

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

const PreviousResult = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const notificationctx = useContext(NotificationContext);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const resultsPerPage = 10;

  const fetchResults = async () => {
    const response = await axios.get("/api/previousresult");
    return response.data.reverse();
  };

  const { data: results, isLoading: loadingPreviousResult } = useQuery(
    "previousResults",
    fetchResults,
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteMutation = useMutation((id) => axios.delete(`/api/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("previousResults");
      notificationctx.showNotification({
        title: "Result Deleted Successfully",
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
  });

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      await router.push("/add-result");
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

  const paginatedResults = results?.slice(startIndex, endIndex) || [];

  return (
    <>
      <Head>
        <title>Morning Sunday Teer Previous Results - Direct Results</title>
        <meta
          name="description"
          content="View direct Morning Sunday Teer previous results. Complete archive of morning teer results with detailed information and history."
        />
        <meta
          name="keywords"
          content="morning sunday teer, previous results, teer results, morning teer archive, teer history, direct results, morning sunday teer previous"
        />
        <meta name="author" content="Morning Sunday Teer Result Archive" />
        <meta
          property="og:title"
          content="Morning Sunday Teer Previous Results - Direct Results"
        />
        <meta
          property="og:description"
          content="View direct Morning Sunday Teer previous results. Complete archive of morning teer results with detailed information and history."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://morningsundayteer.today/previous-result"
        />
      </Head>

      <section className="flex items-center justify-center mt-10">
        {session ? (
          <Button type="button" onClick={handleAddResult}>
            Add Previous Result
          </Button>
        ) : (
          <div className="font-bold text-center">
            <h1 className="text-2xl mb-2">
              Morning Sunday Teer Previous Results
            </h1>
            <p className="text-gray-600">
              Direct results from Morning Sunday Teer
            </p>
          </div>
        )}
      </section>
      {loadingPreviousResult ? (
        <SkeletonTable />
      ) : (
        <main className="flex items-center justify-center mt-8 p-4 sm:p-0 lg:px-24">
          <Table>
            <TableCaption>Morning Sunday Teer Previous Results</TableCaption>
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
              {paginatedResults.map((result) => (
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
    </>
  );
};

export default PreviousResult;

import React, { useState, useEffect, useContext } from "react";
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import SkeletonTable from "@/components/skeleton-table";
import NotificationContext from "@/store/notification-store";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
import { useSession } from "next-auth/react";
import Head from "next/head";
import BottomCard from "@/components/cards/cardbottom";

const PreviousResult = () => {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loadingPreviousResult, setLoadingPreviousResult] = useState(true);
  const [loadingAddPage, setLoadingAddPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStates, setLoadingStates] = useState([]);
  const notificationctx = useContext(NotificationContext);
  const { data: session, status } = useSession();

  const resultsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    setLoadingStates(Array.from({ length: results.length }, () => false));
  }, [results]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/previousresult");
      setResults(response.data.reverse());
      setLoadingPreviousResult(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingPreviousResult(false);
    }
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      await router.push("/add-result");
      setLoadingAddPage(true);
      fetchData();
    } catch (error) {
      console.error("Error adding result:", error);
      setLoadingAddPage(true);
    }
  };

  const handleDelete = async (_id, index) => {
    setLoadingStates((prevLoadingStates) => {
      const updatedLoadingStates = [...prevLoadingStates];
      updatedLoadingStates[index] = true;
      return updatedLoadingStates;
    });

    try {
      await axios.delete(`/api/${_id}`);
      setResults((prevResults) =>
        prevResults.filter((result) => result._id !== _id)
      );
      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data deleted!",
        variant: "destructive",
      });
    } catch (error) {
      notificationctx.showNotification({
        title: "Error!",
        description: error.message || "Error has occurred",
        variant: "destructive",
      });
      console.error("Error deleting data:", error);
    } finally {
      setLoadingStates((prevLoadingStates) => {
        const updatedLoadingStates = [...prevLoadingStates];
        updatedLoadingStates[index] = false;
        return updatedLoadingStates;
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, totalResults);

  return (
    <>
      <Head>
        <title>Previous Teer Results - Shillong Teer Result</title>
        <meta
          name="description"
          content="Check out the previous Shillong Teer results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta
          name="keywords"
          content="teer, shillong teer, teer result, previous teer result, teer result history, teer result archive"
        />
        <meta name="author" content="Shillong Teer Result Archive" />
        <meta
          property="og:title"
          content="Previous Teer Results - Shillong Teer Result"
        />
        <meta
          property="og:description"
          content="Check out the previous Shillong Teer results along with results from other teer regions in India. Stay informed with the past teer results."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.shillongmorningsundayresult.com/previous-result"
        />
      </Head>

      <section className="flex items-center justify-center mt-10">
        {session && (
          <Button type="button" onClick={handleAddResult}>
            {loadingAddPage ? (
              <ClipLoader size={20} color={`#000 dark:#000`} loading={true} />
            ) : (
              "Add Previous Result"
            )}
          </Button>
        )}
      </section>
      {loadingPreviousResult ? (
        <SkeletonTable />
      ) : (
        <main className="flex items-center justify-center mt-8 p-4 sm:p-0 lg:px-24">
          <Table>
            <TableCaption>Shillong Previous Result</TableCaption>
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
              {results.slice(startIndex, endIndex).map((result, index) => (
                <TableRow key={result._id}>
                  <TableCell>{result.city}</TableCell>
                  <TableCell>{formatDate(result.date)}</TableCell>
                  <TableCell>{result.fr}</TableCell>
                  <TableCell>{result.sr}</TableCell>
                  {session && (
                    <TableCell className=" sm:w-auto">
                      <div>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            handleDelete(result._id, startIndex + index)
                          }
                          disabled={loadingStates[startIndex + index]}
                        >
                          {loadingStates[startIndex + index] ? (
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

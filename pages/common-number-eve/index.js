import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import NotificationContext from "@/store/notification-store";
import SkeletonCommon from "@/components/skeleton-common";
import Head from "next/head";
import BottomCard from "@/components/cards/cardbottom";

const CommonNumber = () => {
  const [roundresults, setRoundResults] = useState([]);
  const [roundtworesults, setRoundTwoResults] = useState([]);
  const [loadingStatesRoundOne, setLoadingStatesRoundOne] = useState([]);
  const [loadingStatesRoundTwo, setLoadingStatesRoundTwo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const notificationctx = useContext(NotificationContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/common-number/roundone");
      setRoundResults(response.data.reverse());
      setLoading(false);
      setLoadingStatesRoundOne(
        Array.from({ length: response.data.length }, () => false)
      );
    } catch (error) {
      console.error("Error fetching round one data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTwoData();
  }, []);

  const fetchTwoData = async () => {
    try {
      const response = await axios.get("/api/common-number/roundtwo");
      setRoundTwoResults(response.data.reverse());
      setLoading(false);
      setLoadingStatesRoundTwo(
        Array.from({ length: response.data.length }, () => false)
      );
    } catch (error) {
      console.error("Error fetching round two data:", error);
      setLoading(false);
    }
  };

  const handleRoundTwoDelete = async (_id, index) => {
    setLoadingStatesRoundTwo((prevLoadingStates) => {
      const updatedLoadingStates = [...prevLoadingStates];
      updatedLoadingStates[index] = true;
      return updatedLoadingStates;
    });

    try {
      await axios.delete(`/api/common-number/rtwo/${_id}`);
      setRoundTwoResults((prevRoundTwoResults) =>
        prevRoundTwoResults.filter((result) => result._id !== _id)
      );
      notificationctx.showNotification({
        title: "Data Deleted",
        description: "Data deleted successfully.",
        variant: "destructive",
      });
    } catch (error) {
      notificationctx.showNotification({
        title: "Error!",
        description: error.message || "Error has occurred",
        variant: "error",
      });
      console.error("Error deleting round two data:", error);
    } finally {
      setLoadingStatesRoundTwo((prevLoadingStates) => {
        const updatedLoadingStates = [...prevLoadingStates];
        updatedLoadingStates[index] = false;
        return updatedLoadingStates;
      });
    }
  };

  const handleRoundOneDelete = async (_id, index) => {
    setLoadingStatesRoundOne((prevLoadingStates) => {
      const updatedLoadingStates = [...prevLoadingStates];
      updatedLoadingStates[index] = true;
      return updatedLoadingStates;
    });

    try {
      await axios.delete(`/api/common-number/rone/${_id}`);
      setRoundResults((prevRoundResults) =>
        prevRoundResults.filter((result) => result._id !== _id)
      );
      notificationctx.showNotification({
        title: "Data Deleted ",
        description: "Data deleted successfully.",
        variant: "destructive",
      });
    } catch (error) {
      notificationctx.showNotification({
        title: "Error!",
        description: error.message || "Error has occurred",
        variant: "error",
      });
      console.error("Error deleting round one data:", error);
    } finally {
      setLoadingStatesRoundOne((prevLoadingStates) => {
        const updatedLoadingStates = [...prevLoadingStates];
        updatedLoadingStates[index] = false;
        return updatedLoadingStates;
      });
    }
  };

  const handleRoundOneButtonPush = (e) => {
    e.preventDefault();
    router.push("/common-number/round-1");
  };

  const handleRoundTwoButtonPush = (e) => {
    e.preventDefault();
    router.push("/common-number/round-2");
  };

  return (
    <>
      <Head>
        <title>Common Number Analysis: Shillong Teer Result</title>
        <meta
          name="description"
          content="Check out the Shillong Teer results along with results from other teer regions in India. Stay informed with the past teer results and explore common number analysis."
        />
        <meta
          name="keywords"
          content="teer, shillong teer, teer result, teer result history, teer result archive, common number analysis"
        />
        <meta name="author" content="Shillong Teer Result Archive" />
        <meta
          property="og:title"
          content="Common Number Analysis: Shillong Teer Result"
        />
        <meta
          property="og:description"
          content="Check out the Shillong Teer results along with results from other teer regions in India. Stay informed with the past teer results and explore common number analysis."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.shillongmorningsundayresult.com/common-number"
        />
      </Head>

      {loading ? (
        <SkeletonCommon />
      ) : (
        <>
          <header className="flex flex-wrap items-center justify-center mt-14">
            <p className="font-bold text-xl">Common Number Analysis</p>
          </header>
          <main className="flex flex-col items-center justify-center gap-18 mt-8 p-4 ">
            {session && (
              <section className="flex items-center justify-center mt-0">
                <Button type="button" onClick={handleRoundOneButtonPush}>
                  Add Data for Round 1
                </Button>
              </section>
            )}
            <section className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
              <Table className="border-2">
                <TableCaption>SHILLONG ROUND ONE</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Direct</TableHead>
                    <TableHead className="text-black">House</TableHead>
                    <TableHead className="w-20 text-black">Ending</TableHead>
                    {session && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roundresults.map((result, index) => (
                    <TableRow key={result._id}>
                      <TableCell>{result.direct}</TableCell>
                      <TableCell>{result.house}</TableCell>
                      <TableCell>{result.ending}</TableCell>
                      {session && (
                        <TableCell className="w-0">
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleRoundOneDelete(result._id, index)
                            }
                            disabled={loadingStatesRoundOne[index]}
                          >
                            {loadingStatesRoundOne[index] ? (
                              <ClipLoader
                                size={20}
                                color={"#fff"}
                                loading={true}
                              />
                            ) : (
                              <MdDeleteOutline size={20} />
                            )}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
            {session && (
              <section className="flex items-center justify-center mt-0">
                <Button type="button" onClick={handleRoundTwoButtonPush}>
                  Add Data for Round 2
                </Button>
              </section>
            )}
            <section className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
              <Table className="border-2">
                <TableCaption>SHILLONG ROUND 2</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Direct</TableHead>
                    <TableHead className="text-black">House</TableHead>
                    <TableHead className="w-20 text-black">Ending</TableHead>
                    {session && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roundtworesults.map((result, index) => (
                    <TableRow key={result._id}>
                      <TableCell>{result.direct}</TableCell>
                      <TableCell>{result.house}</TableCell>
                      <TableCell>{result.ending}</TableCell>
                      {session && (
                        <TableCell className="w-0">
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleRoundTwoDelete(result._id, index)
                            }
                            disabled={loadingStatesRoundTwo[index]}
                          >
                            {loadingStatesRoundTwo[index] ? (
                              <ClipLoader
                                size={20}
                                color={"#fff"}
                                loading={true}
                              />
                            ) : (
                              <MdDeleteOutline size={20} />
                            )}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>

            <div className="mt-4 text-center  ">
              <p className="text-[15px] font-thin text-black">
                Disclaimer : These common numbers are purely based on certain
                calculations done using past results. There is no guarantee of
                the accuracy of these numbers.
              </p>
            </div>
            <div>
              <BottomCard />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default CommonNumber;

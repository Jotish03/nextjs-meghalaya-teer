import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
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

const fetchRoundOneData = async () => {
  const response = await axios.get("/api/common-number-noon/roundone");
  return response.data.reverse();
};

const fetchRoundTwoData = async () => {
  const response = await axios.get("/api/common-number-noon/roundtwo");
  return response.data.reverse();
};

const CommonNumber = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const notificationctx = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const [loadingItems, setLoadingItems] = useState({});

  const {
    data: roundOneResults,
    isLoading: isLoadingRoundOne,
    isError: isErrorRoundOne,
  } = useQuery("roundOneData", fetchRoundOneData);

  const {
    data: roundTwoResults,
    isLoading: isLoadingRoundTwo,
    isError: isErrorRoundTwo,
  } = useQuery("roundTwoData", fetchRoundTwoData);

  const deleteRoundOneMutation = useMutation(
    (_id) => axios.delete(`/api/common-number-noon/rone/${_id}`),
    {
      onMutate: (_id) => {
        setLoadingItems((prev) => ({ ...prev, [_id]: true }));
      },
      onSuccess: (_id) => {
        queryClient.invalidateQueries("roundOneData");
        notificationctx.showNotification({
          title: "Data Deleted",
          description: "Data deleted successfully.",
          variant: "destructive",
        });
        setLoadingItems((prev) => ({ ...prev, [_id]: false }));
      },
      onError: (error, _id) => {
        notificationctx.showNotification({
          title: "Error!",
          description: error.message || "Error has occurred",
          variant: "error",
        });
        setLoadingItems((prev) => ({ ...prev, [_id]: false }));
      },
    }
  );

  const deleteRoundTwoMutation = useMutation(
    (_id) => axios.delete(`/api/common-number-noon/rtwo/${_id}`),
    {
      onMutate: (_id) => {
        setLoadingItems((prev) => ({ ...prev, [_id]: true }));
      },
      onSuccess: (_id) => {
        queryClient.invalidateQueries("roundTwoData");
        notificationctx.showNotification({
          title: "Data Deleted",
          description: "Data deleted successfully.",
          variant: "destructive",
        });
        setLoadingItems((prev) => ({ ...prev, [_id]: false }));
      },
      onError: (error, _id) => {
        notificationctx.showNotification({
          title: "Error!",
          description: error.message || "Error has occurred",
          variant: "error",
        });
        setLoadingItems((prev) => ({ ...prev, [_id]: false }));
      },
    }
  );

  const handleRoundOneDelete = (_id) => {
    deleteRoundOneMutation.mutate(_id);
  };

  const handleRoundTwoDelete = (_id) => {
    deleteRoundTwoMutation.mutate(_id);
  };

  const handleRoundOneButtonPush = (e) => {
    e.preventDefault();
    router.push("/common-number-noon/round-1");
  };

  const handleRoundTwoButtonPush = (e) => {
    e.preventDefault();
    router.push("/common-number-noon/round-2");
  };

  if (isLoadingRoundOne || isLoadingRoundTwo) {
    return <SkeletonCommon />;
  }

  if (isErrorRoundOne || isErrorRoundTwo) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <Head>
        <title>Afternoon Common Numbers: Morning Sunday Teer Result</title>
        <meta
          name="description"
          content="Discover common numbers associated with afternoon Morning Sunday Teer results. Stay updated with frequently occurring numbers in the afternoon teer game."
        />
        <meta
          name="keywords"
          content="afternoon common numbers, morning sunday teer, common number list, common number, common number result, common number results, afternoon teer result, afternoon teer game, common numbers, morning sunday teer result"
        />
        <meta name="author" content="Morning Sunday Teer Result Archive" />
        <meta
          property="og:title"
          content="Afternoon Common Numbers: Morning Sunday Teer Result"
        />
        <meta
          property="og:description"
          content="Discover common numbers associated with afternoon Morning Sunday Teer results. Stay updated with frequently occurring numbers in the afternoon teer game."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.morningsundayteer.today/common-number-noon"
        />
      </Head>

      <header className="flex flex-wrap items-center justify-center mt-14">
        <p className="font-bold text-xl">Afternoon Common Number Analysis</p>
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
            <TableCaption> Morning Sunday Afternoon ROUND 1</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Direct</TableHead>
                <TableHead className="text-black">House</TableHead>
                <TableHead className="w-20 text-black">Ending</TableHead>
                {session && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {roundOneResults.map((result) => (
                <TableRow key={result._id}>
                  <TableCell>{result.direct}</TableCell>
                  <TableCell>{result.house}</TableCell>
                  <TableCell>{result.ending}</TableCell>
                  {session && (
                    <TableCell className="w-0">
                      <Button
                        variant="destructive"
                        onClick={() => handleRoundOneDelete(result._id)}
                        disabled={loadingItems[result._id]}
                      >
                        {loadingItems[result._id] ? (
                          <ClipLoader size={20} color={"#fff"} loading={true} />
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
            <TableCaption>Morning Sunday Afternoon ROUND 2</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Direct</TableHead>
                <TableHead className="text-black">House</TableHead>
                <TableHead className="w-20 text-black">Ending</TableHead>
                {session && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {roundTwoResults.map((result) => (
                <TableRow key={result._id}>
                  <TableCell>{result.direct}</TableCell>
                  <TableCell>{result.house}</TableCell>
                  <TableCell>{result.ending}</TableCell>
                  {session && (
                    <TableCell className="w-0">
                      <Button
                        variant="destructive"
                        onClick={() => handleRoundTwoDelete(result._id)}
                        disabled={loadingItems[result._id]}
                      >
                        {loadingItems[result._id] ? (
                          <ClipLoader size={20} color={"#fff"} loading={true} />
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

        <div className="mt-4 text-center">
          <p className="text-[15px] font-thin text-black">
            Disclaimer: These common numbers are purely based on certain
            calculations done using past results. There is no guarantee of the
            accuracy of these numbers.
          </p>
        </div>
        <div>
          <BottomCard />
        </div>
      </main>
    </>
  );
};

export default CommonNumber;

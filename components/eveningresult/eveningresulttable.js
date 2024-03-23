import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "../../public/images/teerlogo.json";
import { Input } from "../ui/input";
import NotificationContext from "@/store/notification-store";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import Loading from "@/pages/loading";
import DateView from "../date";

const EveningResultTable = () => {
  const { data: session, status } = useSession();
  console.log(session?.user?.role);

  const [morningResult, setMorningResult] = useState("XX");
  const [eveningResult, setEveningResult] = useState("XX");
  const [loadingResult, setLoadingResult] = useState(true);
  const [loadingMorningUpdate, setLoadingMorningUpdate] = useState(false);
  const [loadingEveningUpdate, setLoadingEveningUpdate] = useState(false);
  const [loadingMorningDelete, setLoadingMorningDelete] = useState(false);
  const [loadingEveningDelete, setLoadingEveningDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  const notificationctx = useContext(NotificationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const morningResponse = await axios.get(
          "/api/morning-table/morningtable"
        );
        setMorningResult(morningResponse.data.result?.result || "XX");
        const eveningResponse = await axios.get(
          "/api/evening-table/eveningtable"
        );
        setEveningResult(eveningResponse.data.result?.result || "XX");
        setLoading(false);
        setLoadingResult(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        setLoading(false);
        setLoadingResult(false);
      }
    };

    fetchData();
  }, []);

  const handleMorningUpdate = async () => {
    try {
      setLoadingMorningUpdate(true);
      const res = await axios.post(
        "/api/morning-table/morningtable",
        { morningResult },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      notificationctx.showNotification({
        title: "Evening FR Result Added Successfully",
        description: "Result Added",
        variant: "blackToast",
      });
      setMorningResult(morningResult);
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Adding Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoadingMorningUpdate(false);
    }
  };

  const handleEveningUpdate = async () => {
    try {
      setLoadingEveningUpdate(true);
      const res = await axios.post(
        "/api/evening-table/eveningtable",
        { eveningResult },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      notificationctx.showNotification({
        title: "Evening SR Result Added Successfully",
        description: "Result Added",
        variant: "blackToast",
      });
      setEveningResult(eveningResult);
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Adding Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoadingEveningUpdate(false);
    }
  };

  const handleMorningDelete = async () => {
    try {
      setLoadingMorningDelete(true);
      const res = await axios.delete("/api/morning-table/morningtable");

      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data Deleted",
        variant: "destructive",
      });
      setMorningResult("XX");
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Deleting Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoadingMorningDelete(false);
    }
  };

  const handleEveningDelete = async () => {
    try {
      setLoadingEveningDelete(true);
      const res = await axios.delete("/api/evening-table/eveningtable");

      notificationctx.showNotification({
        title: "Result Deleted Successfully",
        description: "Data Deleted",
        variant: "destructive",
      });
      setEveningResult("XX");
    } catch (error) {
      notificationctx.showNotification({
        title: "Error Deleting Result",
        description: "Error!",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoadingEveningDelete(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <main className="flex flex-col lg:mt-0 md:mt-0 flex-wrap items-center justify-center">
            <div className="w-full lg:mt-0 md:mt-0 md:w-2/4 pl-10 pr-10 pb-5">
              <h1 className="text-center mb-2 font-medium">
                Meghalaya Evening Result
              </h1>
              <Table className=" border-2 ">
                <TableCaption className="text-white">
                  <DateView />
                </TableCaption>
                <TableCaption className="mt-[5px]">
                  Meghalaya Teer Result{" "}
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-[#99e4af] ">
                    <TableHead className="w-[100px] text-center font-bold text-black">
                      F/R - 03:30 PM
                    </TableHead>
                    <TableHead className="w-[100px] text-center font-bold text-black">
                      S/R - 04:30 PM
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-[100px] text-center font-medium">
                      <div className="flex flex-col items-center justify-center">
                        {loadingResult ? (
                          <Skeleton className="w-[50px] h-[20px] rounded-full" />
                        ) : (
                          <>
                            {session ? (
                              <>
                                <Input
                                  type="text"
                                  className="text-center"
                                  value={morningResult}
                                  onChange={(e) =>
                                    setMorningResult(e.target.value)
                                  }
                                />
                                <div className="flex gap-1 mt-4">
                                  <Button
                                    onClick={handleMorningUpdate}
                                    disabled={loadingMorningUpdate}
                                  >
                                    {loadingMorningUpdate ? (
                                      <ClipLoader
                                        size={20}
                                        color={"#000"}
                                        loading={true}
                                      />
                                    ) : (
                                      <IoMdAdd size={20} />
                                    )}
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleMorningDelete}
                                    disabled={loadingMorningDelete}
                                  >
                                    {loadingMorningDelete ? (
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
                              </>
                            ) : (
                              morningResult
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="w-[100px] text-center font-medium">
                      <div className="flex flex-col items-center justify-center">
                        {loadingResult ? (
                          <Skeleton className="w-[50px] h-[20px] rounded-full" />
                        ) : (
                          <>
                            {session ? (
                              <>
                                <Input
                                  type="text"
                                  className="text-center"
                                  value={eveningResult}
                                  onChange={(e) =>
                                    setEveningResult(e.target.value)
                                  }
                                />
                                <div className="flex gap-1 mt-4">
                                  <Button
                                    onClick={handleEveningUpdate}
                                    disabled={loadingEveningUpdate}
                                  >
                                    {loadingEveningUpdate ? (
                                      <ClipLoader
                                        size={20}
                                        color={"#000"}
                                        loading={true}
                                      />
                                    ) : (
                                      <IoMdAdd size={20} />
                                    )}
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleEveningDelete}
                                    disabled={loadingEveningDelete}
                                  >
                                    {loadingEveningDelete ? (
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
                              </>
                            ) : (
                              eveningResult
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </main>
          <main className="flex items-center justify-center">
            <div></div>
          </main>
        </>
      )}
    </>
  );
};

export default EveningResultTable;

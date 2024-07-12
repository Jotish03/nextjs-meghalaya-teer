import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Button } from "../ui/button";
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

const fetchMorningResult = async () => {
  const response = await axios.get("/api/morning-table/morningtable");
  return response.data.result?.result || "XX";
};

const fetchEveningResult = async () => {
  const response = await axios.get("/api/evening-table/eveningtable");
  return response.data.result?.result || "XX";
};

const EveningResultTable = () => {
  const { data: session } = useSession();
  const [morningResult, setMorningResult] = useState("XX");
  const [eveningResult, setEveningResult] = useState("XX");
  const notificationctx = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const { data: morningData, isLoading: isMorningLoading } = useQuery(
    "morningResult",
    fetchMorningResult,
    {
      onSuccess: (data) => setMorningResult(data),
    }
  );

  const { data: eveningData, isLoading: isEveningLoading } = useQuery(
    "eveningResult",
    fetchEveningResult,
    {
      onSuccess: (data) => setEveningResult(data),
    }
  );

  const updateMorningMutation = useMutation(
    (newResult) =>
      axios.post("/api/morning-table/morningtable", {
        morningResult: newResult,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("morningResult");
        notificationctx.showNotification({
          title: "Morning FR Result Added Successfully",
          description: "Result Added",
          variant: "blackToast",
        });
      },
      onError: () => {
        notificationctx.showNotification({
          title: "Error Adding Result",
          description: "Error!",
          variant: "destructive",
        });
      },
    }
  );

  const updateEveningMutation = useMutation(
    (newResult) =>
      axios.post("/api/evening-table/eveningtable", {
        eveningResult: newResult,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("eveningResult");
        notificationctx.showNotification({
          title: "Evening SR Result Added Successfully",
          description: "Result Added",
          variant: "blackToast",
        });
      },
      onError: () => {
        notificationctx.showNotification({
          title: "Error Adding Result",
          description: "Error!",
          variant: "destructive",
        });
      },
    }
  );

  const deleteMorningMutation = useMutation(
    () => axios.delete("/api/morning-table/morningtable"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("morningResult");
        notificationctx.showNotification({
          title: "Morning Result Deleted Successfully",
          description: "Data Deleted",
          variant: "destructive",
        });
      },
      onError: () => {
        notificationctx.showNotification({
          title: "Error Deleting Result",
          description: "Error!",
          variant: "destructive",
        });
      },
    }
  );

  const deleteEveningMutation = useMutation(
    () => axios.delete("/api/evening-table/eveningtable"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("eveningResult");
        notificationctx.showNotification({
          title: "Evening Result Deleted Successfully",
          description: "Data Deleted",
          variant: "destructive",
        });
      },
      onError: () => {
        notificationctx.showNotification({
          title: "Error Deleting Result",
          description: "Error!",
          variant: "destructive",
        });
      },
    }
  );

  if (isMorningLoading || isEveningLoading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col lg:mt-0 md:mt-0 flex-wrap items-center justify-center">
      <div className="w-full lg:mt-0 md:mt-0 md:w-2/4 pl-10 pr-10 pb-5">
        <h1 className="text-center mb-2 font-medium">
          Meghalaya Evening Result
        </h1>
        <Table className="border-2">
          <TableCaption className="text-white">
            <DateView />
          </TableCaption>
          <TableCaption className="mt-[5px]">
            Meghalaya Teer Result
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-[#99e4af]">
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
                  {session ? (
                    <>
                      <Input
                        type="text"
                        className="text-center"
                        value={morningResult}
                        onChange={(e) => setMorningResult(e.target.value)}
                      />
                      <div className="flex gap-1 mt-4">
                        <Button
                          onClick={() =>
                            updateMorningMutation.mutate(morningResult)
                          }
                          disabled={updateMorningMutation.isLoading}
                        >
                          {updateMorningMutation.isLoading ? (
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
                          onClick={() => deleteMorningMutation.mutate()}
                          disabled={deleteMorningMutation.isLoading}
                        >
                          {deleteMorningMutation.isLoading ? (
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
                    morningData
                  )}
                </div>
              </TableCell>
              <TableCell className="w-[100px] text-center font-medium">
                <div className="flex flex-col items-center justify-center">
                  {session ? (
                    <>
                      <Input
                        type="text"
                        className="text-center"
                        value={eveningResult}
                        onChange={(e) => setEveningResult(e.target.value)}
                      />
                      <div className="flex gap-1 mt-4">
                        <Button
                          onClick={() =>
                            updateEveningMutation.mutate(eveningResult)
                          }
                          disabled={updateEveningMutation.isLoading}
                        >
                          {updateEveningMutation.isLoading ? (
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
                          onClick={() => deleteEveningMutation.mutate()}
                          disabled={deleteEveningMutation.isLoading}
                        >
                          {deleteEveningMutation.isLoading ? (
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
                    eveningData
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default EveningResultTable;

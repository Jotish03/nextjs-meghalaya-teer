import React, { useState, useContext, useEffect } from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import Loading from "@/pages/loading";
import Announcement from "../announcement";
import NoonResultTable from "../noonresult/noonresult";
import EveningResultTable from "../eveningresult/eveningresulttable";

const fetchResults = async () => {
  const [morningResponse, eveningResponse] = await Promise.all([
    axios.get("/api/morningresult"),
    axios.get("/api/eveningresult"),
  ]);
  return {
    morningResult: morningResponse.data.result?.result || "XX",
    eveningResult: eveningResponse.data.result?.result || "XX",
  };
};

const HeroSection = () => {
  const { data: session } = useSession();
  const notificationctx = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const [morningInput, setMorningInput] = useState("XX");
  const [eveningInput, setEveningInput] = useState("XX");

  const { data, isLoading, isError } = useQuery("results", fetchResults, {
    refetchInterval: 60000, // Refetch every minute
  });

  useEffect(() => {
    if (data) {
      setMorningInput(data.morningResult);
      setEveningInput(data.eveningResult);
    }
  }, [data]);

  const updateResult = async ({ type, result }) => {
    const endpoint =
      type === "morning" ? "/api/morningresult" : "/api/eveningresult";
    await axios.post(endpoint, { [type + "Result"]: result });
  };

  const deleteResult = async (type) => {
    const endpoint =
      type === "morning" ? "/api/morningresult" : "/api/eveningresult";
    await axios.delete(endpoint);
  };

  const updateMutation = useMutation(updateResult, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries("results");
      if (variables.type === "morning") {
        setMorningInput(variables.result);
      } else {
        setEveningInput(variables.result);
      }
      notificationctx.showNotification({
        title: "Result Added Successfully",
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
  });

  const deleteMutation = useMutation(deleteResult, {
    onSuccess: (_, type) => {
      queryClient.invalidateQueries("results");
      if (type === "morning") {
        setMorningInput("XX");
      } else {
        setEveningInput("XX");
      }
      notificationctx.showNotification({
        title: "Result Deleted Successfully",
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
  });

  const handleUpdate = (type) => {
    const result = type === "morning" ? morningInput : eveningInput;
    updateMutation.mutate({ type, result });
  };

  const handleDelete = (type) => {
    deleteMutation.mutate(type);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching results</div>;

  return (
    <>
      <main className="flex flex-col lg:mt-0 md:mt-0 flex-wrap items-center justify-center">
        <Announcement />
        <div className="w-full lg:mt-0 md:mt-0 md:w-2/4 pl-10 pr-10 pb-5">
          <h1 className="text-center mb-2 font-medium">
            Meghalaya Morning Result
          </h1>
          <Table className="border-2">
            <TableHeader>
              <TableRow className="bg-[#99e4af]">
                <TableHead className="w-[100px] text-center font-bold text-black">
                  F/R - 10:30 AM
                </TableHead>
                <TableHead className="w-[100px] text-center font-bold text-black">
                  S/R - 11:30 AM
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="w-[100px] text-center font-medium">
                  <ResultCell
                    result={morningInput}
                    setInput={setMorningInput}
                    onUpdate={() => handleUpdate("morning")}
                    onDelete={() => handleDelete("morning")}
                    isUpdating={
                      updateMutation.isLoading &&
                      updateMutation.variables?.type === "morning"
                    }
                    isDeleting={
                      deleteMutation.isLoading &&
                      deleteMutation.variables === "morning"
                    }
                    session={session}
                  />
                </TableCell>
                <TableCell className="w-[100px] text-center font-medium">
                  <ResultCell
                    result={eveningInput}
                    setInput={setEveningInput}
                    onUpdate={() => handleUpdate("evening")}
                    onDelete={() => handleDelete("evening")}
                    isUpdating={
                      updateMutation.isLoading &&
                      updateMutation.variables?.type === "evening"
                    }
                    isDeleting={
                      deleteMutation.isLoading &&
                      deleteMutation.variables === "evening"
                    }
                    session={session}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
      {/* Noon and Evening result tables are hidden for all users */}
    </>
  );
};

const ResultCell = ({
  result,
  setInput,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
  session,
}) => (
  <div className="flex flex-col items-center justify-center">
    {session ? (
      <>
        <Input
          type="text"
          className="text-center"
          value={result}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-1 mt-4">
          <Button onClick={onUpdate} disabled={isUpdating || isDeleting}>
            {isUpdating ? (
              <ClipLoader size={20} color={"#000"} loading={true} />
            ) : (
              <IoMdAdd size={20} />
            )}
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isUpdating || isDeleting}
          >
            {isDeleting ? (
              <ClipLoader size={20} color={"#fff"} loading={true} />
            ) : (
              <MdDeleteOutline size={20} />
            )}
          </Button>
        </div>
      </>
    ) : (
      result
    )}
  </div>
);

export default HeroSection;

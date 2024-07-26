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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import Loading from "@/pages/loading";

const fetchNoonResults = async () => {
  const [morningResponse, eveningResponse] = await Promise.all([
    axios.get("/api/noon-table/noontablemorning"),
    axios.get("/api/noon-table/noontableeve"),
  ]);
  return {
    morningResult: morningResponse.data.result?.result || "XX",
    eveningResult: eveningResponse.data.result?.result || "XX",
  };
};

const NoonResultTable = () => {
  const { data: session } = useSession();
  const notificationctx = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const [morningInput, setMorningInput] = useState("XX");
  const [eveningInput, setEveningInput] = useState("XX");

  const { data, isLoading, isError } = useQuery(
    "noonResults",
    fetchNoonResults,
    {
      refetchInterval: 60000, // Refetch every minute
      onSuccess: (data) => {
        setMorningInput(data.morningResult);
        setEveningInput(data.eveningResult);
      },
    }
  );

  const updateResult = async ({ type, result }) => {
    const endpoint =
      type === "morning"
        ? "/api/noon-table/noontablemorning"
        : "/api/noon-table/noontableeve";
    await axios.post(endpoint, { [type + "Result"]: result });
  };

  const deleteResult = async (type) => {
    const endpoint =
      type === "morning"
        ? "/api/noon-table/noontablemorning"
        : "/api/noon-table/noontableeve";
    await axios.delete(endpoint);
  };

  const updateMutation = useMutation(updateResult, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries("noonResults");
      if (variables.type === "morning") {
        setMorningInput(variables.result);
      } else {
        setEveningInput(variables.result);
      }
      notificationctx.showNotification({
        title: `Noon ${
          variables.type === "morning" ? "FR" : "SR"
        } Result Added Successfully`,
        description: "Result Added",
        variant: "blackToast",
      });
    },
    onError: () => {
      notificationctx.showNotification({
        title: "Error Adding Noon Result",
        description: "Error!",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation(deleteResult, {
    onSuccess: (_, type) => {
      queryClient.invalidateQueries("noonResults");
      if (type === "morning") {
        setMorningInput("XX");
      } else {
        setEveningInput("XX");
      }
      notificationctx.showNotification({
        title: "Noon Result Deleted Successfully",
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
  if (isError) return <div>Error fetching noon results</div>;

  return (
    <main className="flex flex-col lg:mt-0 md:mt-0 flex-wrap items-center justify-center">
      <div className="w-full lg:mt-0 md:mt-0 md:w-2/4 pl-10 pr-10 pb-5">
        <h1 className="text-center mb-2 font-medium">Meghalaya Noon Result</h1>
        <Table className="border-2">
          <TableHeader>
            <TableRow className="bg-[#99e4af]">
              <TableHead className="w-[100px] text-center font-bold text-black">
                F/R - 12:30 PM
              </TableHead>
              <TableHead className="w-[100px] text-center font-bold text-black">
                S/R - 01:30 PM
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-[100px] text-center font-medium">
                <ResultCell
                  result={morningInput}
                  setResult={setMorningInput}
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
                  setResult={setEveningInput}
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
  );
};

const ResultCell = ({
  result,
  setResult,
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
          onChange={(e) => setResult(e.target.value)}
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

export default NoonResultTable;

import React, { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { z } from "zod";
import NotificationContext from "@/store/notification-store";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  direct: z.string().min(1, { message: "Direct is required" }),
  house: z.string().min(1, { message: "House is required" }),
  ending: z.string().min(1, { message: "Ending is required" }),
});

const RoundOne = () => {
  const notificationctx = useContext(NotificationContext);
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      direct: "",
      house: "",
      ending: "",
    },
  });

  const addResultMutation = useMutation(
    (formData) => axios.post("/api/common-number/roundone", formData),
    {
      onSuccess: () => {
        notificationctx.showNotification({
          title: "Round 1 Added Successfully",
          description: "Success",
          variant: "blackToast",
        });
        queryClient.invalidateQueries("roundOneResults");
        reset();
        router.push("/common-number");
      },
      onError: (error) => {
        notificationctx.showNotification({
          title: "Error adding result",
          description: "Check fields",
          variant: "destructive",
        });
        console.error("Error adding result:", error);
      },
    }
  );

  const onSubmit = (data) => {
    addResultMutation.mutate(data);
  };

  const onCancel = (e) => {
    e.preventDefault();
    router.push("/common-number");
  };

  return (
    <>
      <Head>
        <title>Add Morning Round One: Meghalaya Teer Result</title>
        <meta
          name="description"
          content="Add round one results for Morning Meghalaya Teer. Stay informed with the past teer results and explore common number analysis."
        />
        <meta
          name="keywords"
          content="teer, meghalaya teer, teer result, teer result history, teer result archive, common number analysis"
        />
        <meta name="author" content="Meghalaya Teer Result Archive" />
        <meta
          property="og:title"
          content="Common Number Analysis: Meghalaya Teer Result"
        />
        <meta
          property="og:description"
          content="Add round one results for Morning Meghalaya Teer. Stay informed with the past teer results and explore common number analysis."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.meghalayasundayteer.com/common-number/round-1"
        />
      </Head>

      {session ? (
        <main className="flex items-center justify-center p-8 min-h-[90vh]">
          <Card className="w-[550px]">
            <CardHeader>
              <CardTitle>Update Common Number</CardTitle>
              <CardDescription>Round One</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="direct">Direct</Label>
                    <Input
                      id="direct"
                      {...register("direct")}
                      placeholder="Enter Direct Number"
                    />
                    {errors.direct && (
                      <span className="text-red-500">
                        {errors.direct.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="house">House</Label>
                    <Input
                      id="house"
                      {...register("house")}
                      placeholder="Enter House Number"
                    />
                    {errors.house && (
                      <span className="text-red-500">
                        {errors.house.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="ending">Ending</Label>
                    <Input
                      id="ending"
                      {...register("ending")}
                      placeholder="Enter Ending Number"
                    />
                    {errors.ending && (
                      <span className="text-red-500">
                        {errors.ending.message}
                      </span>
                    )}
                  </div>
                  <CardFooter className="flex justify-end gap-2 mr-[-20px]">
                    <Button variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={addResultMutation.isLoading}
                    >
                      {addResultMutation.isLoading ? (
                        <ClipLoader
                          size={20}
                          color={`#000 dark:#000`}
                          loading={true}
                        />
                      ) : (
                        <IoMdAdd size={20} />
                      )}
                    </Button>
                  </CardFooter>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80dvh] gap-4">
          <p>Login to access</p>
          <Link href="/" className="">
            <Button className="font">Go to Homepage</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default RoundOne;

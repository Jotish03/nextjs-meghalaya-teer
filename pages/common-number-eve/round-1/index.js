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

  const addRoundOneMutation = useMutation(
    (formData) => axios.post("/api/common-number-eve/roundone", formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("roundOneData");
        notificationctx.showNotification({
          title: "Round 1 Added Successfully",
          description: "Success",
          variant: "blackToast",
        });
        router.push("/common-number-eve");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      direct: e.target.direct.value,
      house: e.target.house.value,
      ending: e.target.ending.value,
    };

    try {
      schema.parse(formData);
      addRoundOneMutation.mutate(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        Object.keys(fieldErrors).forEach((key) => {
          notificationctx.showNotification({
            title: `${key} Error`,
            description: fieldErrors[key][0],
            variant: "destructive",
          });
        });
      }
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    router.push("/common-number-eve");
  };

  return (
    <>
      <Head>
        <title>Add Evening Round One: Meghalaya Teer Result</title>
        <meta
          name="description"
          content="Add round one data for Evening Meghalaya Teer results and explore common number analysis. Stay informed with frequently occurring numbers in the teer game."
        />
        <meta
          name="keywords"
          content="teer, meghalaya teer, teer result, teer result history, teer result archive, common number analysis, add round one, evening teer result"
        />
        <meta name="author" content="Meghalaya Teer Result Archive" />
        <meta
          property="og:title"
          content="Add Evening Round One: Meghalaya Teer Result"
        />
        <meta
          property="og:description"
          content="Add round one data for Evening Meghalaya Teer results and explore common number analysis. Stay informed with frequently occurring numbers in the teer game."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.meghalayasundayteer.com/add-evening-round-one"
        />
      </Head>

      {session ? (
        <main className="flex items-center justify-center p-8 min-h-[90vh]">
          <Card className="w-[550px]">
            <CardHeader>
              <CardTitle>Update Common Number</CardTitle>
              <CardDescription>Eve Round One</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="direct">Direct</Label>
                    <Input
                      id="direct"
                      name="direct"
                      placeholder="Enter Direct Number"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="house">House</Label>
                    <Input
                      id="house"
                      name="house"
                      placeholder="Enter House Number"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="ending">Ending</Label>
                    <Input
                      id="ending"
                      name="ending"
                      placeholder="Enter Ending Number"
                    />
                  </div>
                  <CardFooter className="flex justify-end gap-2 mr-[-20px]">
                    <Button variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={addRoundOneMutation.isLoading}
                    >
                      {addRoundOneMutation.isLoading ? (
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

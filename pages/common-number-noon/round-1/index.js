import React, { useState, useContext } from "react";
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

  const [formData, setFormData] = useState({
    direct: "",
    house: "",
    ending: "",
  });
  const [formErrors, setFormErrors] = useState({
    direct: "",
    house: "",
    ending: "",
  });

  const addResultMutation = useMutation(
    (data) => axios.post("/api/common-number-noon/roundone", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("roundOneData");
        notificationctx.showNotification({
          title: "Noon Round 1 Added Successfully",
          description: "Success",
          variant: "blackToast",
        });
        router.push("/common-number-noon");
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      addResultMutation.mutate(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
      }
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    router.push("/common-number-noon");
  };

  return (
    <>
      <Head>
        <title>Add Noon Round One: Meghalaya Teer Result</title>
        <meta
          name="description"
          content="Add common numbers for Noon Round One in Meghalaya Teer. Stay updated with frequently occurring numbers in the morning teer game."
        />
        <meta
          name="keywords"
          content="noon round one, common numbers, meghalaya teer, teer result, teer game, meghalaya teer result"
        />
        <meta name="author" content="Meghalaya Teer Result Archive" />
        <meta
          property="og:title"
          content="Add Noon Round One: Meghalaya Teer Result"
        />
        <meta
          property="og:description"
          content="Add common numbers for Noon Round One in Meghalaya Teer. Stay updated with frequently occurring numbers in the morning teer game."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.meghalayasundayteer.com/common-number-noon/round-1"
        />
      </Head>

      {session ? (
        <main className="flex items-center justify-center p-8 min-h-[90vh]">
          <Card className="w-[550px]">
            <CardHeader>
              <CardTitle>Update Common Number</CardTitle>
              <CardDescription>Noon Round One</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="direct">Direct</Label>
                    <Input
                      id="direct"
                      name="direct"
                      value={formData.direct}
                      onChange={handleChange}
                      placeholder="Enter Direct Number"
                    />
                    {formErrors.direct && (
                      <span className="text-red-500">{formErrors.direct}</span>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="house">House</Label>
                    <Input
                      id="house"
                      name="house"
                      value={formData.house}
                      onChange={handleChange}
                      placeholder="Enter House Number"
                    />
                    {formErrors.house && (
                      <span className="text-red-500">{formErrors.house}</span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="ending">Ending</Label>
                    <Input
                      id="ending"
                      name="ending"
                      value={formData.ending}
                      onChange={handleChange}
                      placeholder="Enter Ending Number"
                    />
                    {formErrors.ending && (
                      <span className="text-red-500">{formErrors.ending}</span>
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

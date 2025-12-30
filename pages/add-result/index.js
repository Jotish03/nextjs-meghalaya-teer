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
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { z } from "zod";
import NotificationContext from "@/store/notification-store";
import Head from "next/head";

const schema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  date: z.date({ message: "Date is required" }),
  fr: z.string().min(1, { message: "F/R is required" }),
  sr: z.string().min(1, { message: "S/R is required" }),
});

const AddResult = () => {
  const notificationctx = useContext(NotificationContext);
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    city: "",
    date: "",
    fr: "",
    sr: "",
  });
  const [formErrors, setFormErrors] = useState({
    city: "",
    date: "",
    fr: "",
    sr: "",
  });

  const addResultMutation = useMutation(
    (data) => axios.post("/api/addresult", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("previousResults");
        notificationctx.showNotification({
          title: "Result Added Successfully",
          description: "Success",
          variant: "blackToast",
        });
        router.push("/previous-result");
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
    router.push("/previous-result");
  };

  return (
    <>
      <Head>
        <title>Add Morning Round Result: Morning Sunday Teer Result</title>
        <meta
          name="description"
          content="Submit teer results to contribute to the Morning Sunday Teer community. Stay engaged and help others stay updated with the latest teer results for the morning round."
        />
        <meta
          name="keywords"
          content="teer, morning sunday teer, add result, teer result submission, teer result contribution, morning round result"
        />
        <meta name="author" content="Morning Sunday Teer Result Team" />
        <meta
          property="og:title"
          content="Add Morning Round Result - Morning Sunday Teer Result"
        />
        <meta
          property="og:description"
          content="Submit teer results to contribute to the Morning Sunday Teer community. Stay engaged and help others stay updated with the latest teer results for the morning round."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.morningsundayteer.today" />
        {/* Add more meta tags as needed */}
      </Head>

      {session ? (
        <main className="flex items-center justify-center p-8 min-h-[90vh]">
          <Card className="w-[550px]">
            <CardHeader>
              <CardTitle>Update Previous Result</CardTitle>
              <CardDescription>Add Previous Result below:</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter City"
                    />
                    {formErrors.city && (
                      <span className="text-red-500">{formErrors.city}</span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? (
                            format(new Date(formData.date), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) =>
                            setFormData({ ...formData, date: date })
                          }
                          initialFocus
                          name="date"
                        />
                      </PopoverContent>
                    </Popover>
                    {formErrors.date && (
                      <span className="text-red-500">
                        <p>Date is required</p>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="fr">F/R</Label>
                    <Input
                      id="fr"
                      name="fr"
                      value={formData.fr}
                      onChange={handleChange}
                      placeholder="Enter FR"
                    />
                    {formErrors.fr && (
                      <span className="text-red-500">{formErrors.fr}</span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="sr">S/R</Label>
                    <Input
                      id="sr"
                      name="sr"
                      value={formData.sr}
                      onChange={handleChange}
                      placeholder="Enter SR"
                    />
                    {formErrors.sr && (
                      <span className="text-red-500">{formErrors.sr}</span>
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

export default AddResult;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NotificationContext from "@/store/notification-store";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "@/pages/loading";
import { ClipLoader } from "react-spinners";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const notificationctx = useContext(NotificationContext);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  const handleUserLoginAuth = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(result);
      if (result?.error) {
        notificationctx.showNotification({
          title: "Error while logging in",
          description: result.error || "Error with Credentials",
          variant: "destructive",
        });
      } else {
        router.push("/");
        notificationctx.showNotification({
          title: "You are now logged in",
          description: "Redirecting to homepage...",
          variant: "blackToast",
        });
      }
    } catch (error) {
      notificationctx.showNotification({
        title: "Error",
        description: error.message || "Error has occurred!",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Meghalaya Teer Result</title>
        <meta
          name="description"
          content="Login to access personalized features and stay updated with the latest Meghalaya Teer results."
        />
        <meta
          name="keywords"
          content="teer, meghalaya teer, login, teer result, teer result today"
        />
        <meta name="author" content="Meghalaya Teer Result Team" />
        <meta property="og:title" content="Login - Meghalaya Teer Result" />
        <meta
          property="og:description"
          content="Login to access personalized features and stay updated with the latest Meghalaya Teer results."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.meghalayasundayteer.com" />
      </Head>

      {loading && <Loading />}
      <main className="flex items-center justify-center h-[80dvh] p-8">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Admin Authenticate</CardTitle>
            <CardDescription>Login to access</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUserLoginAuth}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Link href="/">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>

                <Button type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <ClipLoader
                      size={20}
                      color={`#000 dark:#000`}
                      loading={true}
                    />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>

            <div className="flex items-center justify-center mt-8">
              <Label className="font-thin text-gray-400">
                Secure Admin Login: Meghalaya Teer{" "}
              </Label>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default UserLogin;

import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { useState } from "react";
import { object, string } from "zod";
import { useSession } from "next-auth/react";
import Head from "next/head";

const UserRegister = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const response = await axios.post("/api/auth/registerauth", formData);

        setFormData({ name: "", email: "", password: "", cpassword: "" });
        setIsSubmitted(true);
        setTimeout(() => {
          router.push("/user-auth/user-login");
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrors({ email: "Email already exists" });
        } else {
          console.error(error);
        }
      }
    } else {
      console.log("Form validation failed. Please check the fields.");
    }
  };

  const validateForm = () => {
    const { name, email, password, cpassword } = formData;
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      errors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    }
    if (!cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (cpassword !== password) {
      errors.cpassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <Head>
        <title>Register - Shillong Teer Result</title>
        <meta
          name="description"
          content="Register to create an account and access personalized features. Stay updated with the latest Shillong Teer results."
        />
        <meta
          name="keywords"
          content="teer, shillong teer, register, teer result, teer result today"
        />
        <meta name="author" content="Shillong Teer Result Team" />
        <meta property="og:title" content="Register - Shillong Teer Result" />
        <meta
          property="og:description"
          content="Register to create an account and access personalized features. Stay updated with the latest Shillong Teer results."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.shillongmorningsundayresult.com"
        />
        {/* Add more meta tags as needed */}
      </Head>

      {session ? (
        <main className="flex items-center justify-center h-[90vh] p-8">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle>Admin Authenticate</CardTitle>
              <CardDescription>Login to access</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <p>Registration successful. Redirecting to login page...</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <span className="text-red-500">{errors.name}</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <span className="text-red-500">{errors.email}</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <span className="text-red-500">{errors.password}</span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="cpassword">Confirm Password</Label>
                      <Input
                        id="cpassword"
                        type="password"
                        placeholder="Confirm your password"
                        name="cpassword"
                        value={formData.cpassword}
                        onChange={handleChange}
                      />
                      {errors.cpassword && (
                        <span className="text-red-500">{errors.cpassword}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Link href="/">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </Link>
                    <Button type="submit">Register</Button>
                  </div>
                </form>
              )}
              <div className="flex items-center justify-center mt-8">
                <Label className="font-thin text-gray-400">
                  Secure Admin Register: Shillong Teer{" "}
                </Label>
              </div>
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

export default UserRegister;

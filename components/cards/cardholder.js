import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const CardHolder = ({ url, title }) => {
  return (
    <Card className="w-[120px] lg:w-[300px] md:w-[200px] sm:w-[120px] ">
      <CardHeader className="p-0">
        <Image
          src={url}
          width={500}
          height={500}
          className="rounded-lg "
          layout="responsive"
          priority
          alt={title}
        />
      </CardHeader>
    </Card>
  );
};

export default CardHolder;

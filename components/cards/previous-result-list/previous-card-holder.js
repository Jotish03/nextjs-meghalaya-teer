import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const PreviousCardHolder = ({ url, title, width = 500, height = 500 }) => {
  return (
    <Card className="w-[200px] lg:w-[300px] md:w-[200px] ">
      <CardHeader className="p-0">
        <div className="relative ">
          <Image
            src={url}
            alt={title}
            width={width}
            height={height}
            className="rounded-lg"
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default PreviousCardHolder;

import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const CardHolder = ({ url, title, width = 500, height = 500 }) => {
  return (
    <Card className="w-[120px] lg:w-[300px] md:w-[200px] sm:w-[120px]">
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

export default CardHolder;

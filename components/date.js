// components/DateView.js

import React from "react";
import { format } from "date-fns";

const DateView = () => {
  // Get today's date
  const today = new Date();

  // Format the date for human readability
  const formattedDate = format(today, "MMMM do, yyyy");

  return (
    <div className="text-center ">
      <p className="text-lg mt-2 font-bold text-black dark:text-white">
        {formattedDate}
      </p>
    </div>
  );
};

export default DateView;

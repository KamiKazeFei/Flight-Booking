"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        caption_dropdowns: "flex justify-center gap-2",
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

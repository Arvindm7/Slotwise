// Import necessary components and libraries
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

/**
 * PreviewMeeting Component
 * Displays a preview of the meeting details and allows users to select a date and time slot.
 *
 * @param {Object} formValue - Contains the details of the meeting (e.g., eventName, duration, locationType, etc.)
 */
function PreviewMeeting({ formValue }) {
  // State to hold the selected date and the generated time slots
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();

  // useEffect hook to generate time slots whenever the formValue's duration changes
  useEffect(() => {
    formValue?.duration && createTimeSlot(formValue?.duration); // Only create time slots if duration is provided
  }, [formValue]);

  /**
   * Function to create time slots based on the meeting duration (interval)
   *
   * @param {Number} interval - The duration of the meeting in minutes (e.g., 30, 60)
   */
  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // Start at 8:00 AM, converted to minutes (8 hours * 60 minutes)
    const endTime = 22 * 60; // End at 10:00 PM, converted to minutes (22 hours * 60 minutes)
    const totalSlots = (endTime - startTime) / interval; // Calculate the total number of available slots

    // Generate an array of time slots
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval; // Calculate total minutes for each time slot
      const hours = Math.floor(totalMinutes / 60); // Get the hours part
      const minutes = totalMinutes % 60; // Get the minutes part

      // Format the hours to 12-hour format with AM/PM
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";

      // Return the formatted time string (e.g., "09:00 AM", "01:30 PM")
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots); // Set the generated slots in the timeSlots state
  };

  // JSX return block that renders the meeting preview and allows date/time selection
  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8"
      style={{ borderTopColor: formValue?.themeColor }}
    >
      {/* Display the logo */}
      <Image src="/logo.svg" alt="logo" width={150} height={150} />

      {/* Grid layout for meeting information and date/time selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting Information Section */}
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-3xl">
            {formValue?.eventName ? formValue?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            {/* Display meeting duration */}
            <h2 className="flex gap-2">
              <Clock />
              {formValue?.duration} Min
            </h2>

            {/* Display location type */}
            <h2 className="flex gap-2">
              <MapPin />
              {formValue?.locationType} Meeting
            </h2>

            {/* Link to the meeting's location URL */}
            <Link href={"#"} className="text-primary">
              {formValue?.locationUrl}
            </Link>
          </div>
        </div>

        {/* Time & Date Selection Section */}
        <div className="md:col-span-2 flex px-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Select Date & Time</h2>

            {/* Calendar for selecting the date */}
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate} // Set the selected date
              className="rounded-md border mt-5"
              disabled={(date) => date <= new Date()} // Disable past dates
            />
          </div>

          {/* Time Slot Selection */}
          <div
            className="flex flex-col w-full overflow-auto gap-4 p-5"
            style={{ maxHeight: "400px" }}
          >
            {/* Display the generated time slots */}
            {timeSlots?.map((time, index) => (
              <Button
                key={index}
                className="border-primary text-primary"
                variant="outline"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewMeeting;

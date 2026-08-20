import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  service: z.string().min(1, "Service is required"),
  branch: z.string().min(1, "Branch is required"),
  message: z.string().optional(),
});

export const createBooking = createServerFn({ method: "POST" })
  .validator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("bookings")
      .insert([data]);

    if (error) {
      console.error("Error creating booking:", error);
      throw new Error("Failed to save booking");
    }

    // Placeholder for email notification logic
    console.log("Booking notification would be sent here for:", data.name);

    return { success: true };
  });

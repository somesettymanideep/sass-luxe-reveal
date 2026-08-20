import { supabase } from "@/integrations/supabase/client";

export const createBooking = async ({ data }: { data: any }) => {
  // Ensure optional fields are handled correctly for Supabase (null instead of undefined)
  const bookingData = {
    name: data.name,
    phone: data.phone,
    service: data.service,
    branch: data.branch,
    message: data.message ?? null,
  };

  const { error } = await supabase
    .from("bookings")
    .insert([bookingData]);

  if (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to save booking");
  }

  // Placeholder for email notification logic
  console.log("Booking notification would be sent here for:", data.name);

  return { success: true };
};

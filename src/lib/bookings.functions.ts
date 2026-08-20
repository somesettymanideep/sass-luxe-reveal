import { supabase } from "@/integrations/supabase/client";

export const createBooking = async (data: any) => {
  const { error } = await supabase
    .from("bookings")
    .insert([{
      name: data.name,
      phone: data.phone,
      service: data.service,
      branch: data.branch,
      message: data.message || null,
    }]);

  if (error) throw error;
  return { success: true };
};

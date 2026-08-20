import { supabase } from "@/integrations/supabase/client";

export const createContact = async ({ data }: { data: any }) => {
  const { error } = await supabase.from("bookings").insert([{
    name: data.name,
    phone: data.phone,
    service: data.subject || "Contact Form",
    branch: "General",
    message: data.message || null,
    status: "contact"
  }]);

  if (error) throw new Error(error.message);
  return { success: true };
};

export const createConsultation = async ({ data }: { data: any }) => {
  const { error } = await supabase.from("bookings").insert([{
    name: data.name,
    phone: data.phone,
    service: data.service || "Consultation",
    branch: data.location || "General",
    message: `${data.date || ""} ${data.time || ""} ${data.message || ""}`.trim() || null,
    status: "consultation"
  }]);

  if (error) throw new Error(error.message);
  return { success: true };
};

export const getBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

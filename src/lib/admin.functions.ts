import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().optional(),
  branch: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export const createContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const structuredMessage = JSON.stringify({
      date: null,
      time: null,
      email: data.email || null,
      notes: data.message || null,
    });

    const { error } = await supabase.from("bookings").insert([
      {
        name: data.name,
        phone: data.phone,
        service: data.service || data.subject || "Contact Form",
        branch: data.branch || "General",
        message: structuredMessage,
        status: "contact",
      },
    ]);

    if (error) throw new Error(error.message);
    return { success: true };
  });

const consultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  message: z.string().optional(),
});

export const createConsultation = createServerFn({ method: "POST" })
  .validator((data: unknown) => consultationSchema.parse(data))
  .handler(async ({ data }) => {
    const structuredMessage = JSON.stringify({
      date: data.date || null,
      time: data.time || null,
      email: data.email || null,
      notes: data.message || null,
    });

    const { error } = await supabase.from("bookings").insert([
      {
        name: data.name,
        phone: data.phone,
        service: data.service || "Consultation",
        branch: data.location || "General",
        message: structuredMessage,
        status: "consultation",
      },
    ]);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const getBookings = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
});

const updateStatusSchema = z.object({
  id: z.string(),
  status: z.string(),
});

export const updateBookingStatus = createServerFn({ method: "POST" })
  .validator((data: unknown) => updateStatusSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

const deleteBookingSchema = z.object({
  id: z.string(),
});

export const deleteBooking = createServerFn({ method: "POST" })
  .validator((data: unknown) => deleteBookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

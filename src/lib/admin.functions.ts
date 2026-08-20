import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export const createContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase.from("contacts").insert([{
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      subject: data.subject || null,
      message: data.message || null,
    }]);

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
    const { error } = await supabase.from("consultations").insert([{
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service || null,
      location: data.location || null,
      preferred_date: data.date || null,
      preferred_time: data.time || null,
      message: data.message || null,
    }]);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const getBookings = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const getContacts = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const getConsultations = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

# Plan: Mobile-Responsive Popup & Backend Integration

Improve the appointment form UI for mobile devices and connect it to Lovable Cloud for database persistence and email notifications.

## User Review Required

> [!IMPORTANT]
> To enable email notifications, I will need you to provide the recipient email address where you'd like to receive booking alerts. I'll use a placeholder for now.

## Proposed Changes

### Database & Backend
- Create a `bookings` table in Lovable Cloud to store name, phone, service, branch, and message.
- Enable RLS and set up appropriate `GRANT`s.
- Create a TanStack server function `createBooking` to handle the submission securely on the server.
- Integrate an email notification step in the server function (using Lovable AI or a simple notification helper).

### UI & UX (Mobile Responsive)
- Refactor `AppointmentForm.tsx` popup container to use `max-h-[90vh]` and `overflow-y-auto` to ensure it fits on small mobile screens.
- Adjust grid layouts to stack correctly on small viewports.
- Improve form field touch targets and spacing for mobile users.
- Add a success state that clearly confirms the booking has been saved.

### Integration
- Replace the mock `setTimeout` logic in `AppointmentForm.tsx` with a call to the new `createBooking` server function.

## Technical Details

### Database Schema
```sql
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  branch text NOT NULL,
  message text,
  status text DEFAULT 'pending'
);

GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a booking" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view bookings" ON public.bookings FOR SELECT TO authenticated USING (true);
```

### Server Function
A new file `src/lib/bookings.functions.ts` will house the `createBooking` function using `createServerFn`.

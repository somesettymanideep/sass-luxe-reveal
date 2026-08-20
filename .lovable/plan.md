# Admin Panel Redesign

Redesign the admin panel to provide a professional, luxury experience for managing salon leads and bookings.

## User Review Required

- [ ] **Sidebar Layout**: Move from a top-bar to a professional sidebar navigation.
- [ ] **Dashboard Stats**: Add overview cards for Total Bookings, Today's Leads, and Branch Distribution.
- [ ] **Enhanced Data Display**: Use a cleaner table/card hybrid layout with better typography and action items.
- [ ] **Refined Auth UI**: Modernize the login screen with better focus states and luxury branding.

## Technical Details

- **Layout Structure**: Implement `AdminLayout` with a persistent `Sidebar`.
- **State Management**: Improve loading states and data fetching with `useQuery` patterns (or enhanced `useEffect`).
- **Styling**: Leverage existing `gold-gradient` and `ink` tokens.
- **Components**:
  - `StatCard`: Highlight key metrics.
  - `BookingTable`: A more structured view for submissions.
  - `StatusBadge`: Clearer visual indicators for 'Booking', 'Contact', and 'Consultation'.
- **Responsive Design**: Ensure the sidebar collapses or transforms on mobile.

## Design References
- Palette: `#000000` (Ink), `#E7CF39` (Gold), `#FDFCF8` (Cream).
- Radius: `7px`.

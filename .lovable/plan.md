---
title: Redesign admin login and dashboard
description: Apply the selected Bespoke Salon Dashboard direction to both admin states.
type: feature
---

## Goal
Create a polished admin login and bookings workspace using the selected Ivory & Onyx palette, Space Grotesk headings, DM Sans body text, and executive sidebar composition.

## Changes
- Rebuild the login as a confident split editorial screen with clear branding, high-contrast fields, error feedback, password visibility, and responsive stacking.
- Rework the dashboard into a spacious ivory workspace with an onyx sidebar, concise page header, four compact summary cards, search, refresh, and clear status filters.
- Present booking records as a structured desktop table and readable mobile cards while preserving all existing data, filtering, phone links, messages, and loading/empty states.
- Remove the accidental instruction text currently displayed beneath the dashboard title.
- Add admin-specific semantic palette and typography tokens while retaining the site-wide 7px radius rule.
- Add unique admin page metadata and verify login/dashboard rendering at desktop and mobile sizes.

## Technical details
- Keep the current `/admin` route, login credentials, local login persistence, booking fetch, statistics, search, filtering, refresh, and logout behavior unchanged.
- Use only the locked admin colors `#F6EFE8`, `#FFFFFF`, `#111111`, and `#D39326`, expressed through semantic design tokens.
- Load Space Grotesk and DM Sans through document head links; no remote CSS imports.
- Use existing React and icon components; no backend or database changes.

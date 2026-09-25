import type { BadgeProps } from '../../components/Badge';

/*
 * Copy for the booking prototype (Figma Playground, Version C — Booking flow).
 * Neutral demo content: a fictional tour company, guide and guest.
 */

export const tour = {
  name: 'Old Town & Harbour walking tour',
  crumb: 'Old Town & Harbour',
  lead: 'Two hours through the old town and along the harbour with a local guide. Small groups, rain or shine.',
  price: '€29 per person',
  schedule: 'Daily at 10:00 and 15:00 · 2 hours',
  cancellation: 'Free cancellation up to 24 hours before the tour.',
  capacity: 12,
  taken: 9,
};

export const tags: { label: string; variant: BadgeProps['variant'] }[] = [
  { label: 'Walking tour', variant: 'accent' },
  { label: 'Family-friendly', variant: 'success' },
];

export const tabs = [
  {
    value: 'overview',
    label: 'Overview',
    text: 'Start at the harbour master’s office, cross the market square and finish at the lighthouse café. The route is flat and step-free, about 3 km.',
  },
  {
    value: 'itinerary',
    label: 'Itinerary',
    text: 'Harbour master’s office · market square · cathedral steps · the old warehouses · lighthouse café.',
  },
  {
    value: 'reviews',
    label: 'Reviews',
    text: 'Guests rate it 4.8 out of 5. Most mention the stories behind the old warehouses.',
  },
];

export const included = [
  {
    value: 'guide',
    title: 'A local guide',
    text: 'Groups of up to 12, led by guides who live in the old town. Tours run in English and German.',
  },
  { value: 'coffee', title: 'A coffee stop', text: 'A short break at the lighthouse café. Coffee or tea is on us.' },
  {
    value: 'access',
    title: 'Accessibility',
    text: 'The whole route is step-free. Tell us about any needs when you book.',
  },
];

export const times = [
  { value: 'sat-10', label: 'Sat 18 October · 10:00', disabled: false },
  { value: 'sat-15', label: 'Sat 18 October · 15:00', disabled: false },
  { value: 'sun-10', label: 'Sun 19 October · 10:00 · sold out', disabled: true },
];

export const languages = { en: 'English', de: 'German' };

export const guest = { name: 'Alex Morgan', email: 'alex@example.com', people: 2 };

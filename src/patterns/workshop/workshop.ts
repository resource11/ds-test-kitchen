import type { BadgeProps } from '../../components/Badge';

/*
 * Copy for the workshop sign-up prototype (Figma Playground, section
 * "Workshop sign-up (from a brief)"). Neutral demo content: a fictional
 * studio, host and guest.
 */

export const workshop = {
  crumb: 'Figma to code',
  title: 'Figma to code: a half-day workshop',
  lead: 'Build one screen in Figma, bring it into Storybook with real components, and send a change back. For designers who know Figma well; no coding needed.',
  seats: 4,
  price: 'Free',
  format: 'Online · 3.5 hours',
  included: 'A live session with exercises in a shared Figma file and Storybook. Recording and slides included.',
};

export const tags: { label: string; variant: BadgeProps['variant'] }[] = [
  { label: 'Online', variant: 'accent' },
  { label: 'Beginner', variant: 'success' },
];

export const roles = {
  product: 'Product designer',
  system: 'Design system designer',
  developer: 'Developer',
  other: 'Something else',
};

export const dates = [
  { value: 'tue-14', label: 'Tue 14 October', disabled: false },
  { value: 'thu-16', label: 'Thu 16 October', disabled: false },
  { value: 'tue-21', label: 'Tue 21 October · sold out', disabled: true },
];

export const host = { name: 'Rowan Lee', initials: 'RL', role: 'Your host · design systems educator' };

export const guest = { name: 'Sam Rivera', initials: 'SR', email: 'sam@example.com' };

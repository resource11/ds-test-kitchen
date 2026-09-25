import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { Form } from '../components/Form';
import type { FormProps } from '../components/Form';
import { TextField } from '../components/TextField';
import styles from './Patterns.module.css';

type FieldErrors = NonNullable<FormProps['errors']>;

/**
 * Stands in for the server round trip, the same way `Form.stories.tsx` does:
 * the submitted values come back either as per-field messages keyed by field
 * name, or as one summary line when the failure is not about a single field.
 */
function fakeSignUp(values: Record<string, unknown>): {
  fieldErrors: FieldErrors;
  summary: string | null;
} {
  const fieldErrors: Record<string, string> = {};
  const email = String(values.email ?? '')
    .trim()
    .toLowerCase();
  const password = String(values.password ?? '');
  const acceptedTerms = Boolean(values.terms);

  if (email === 'nadia@northwind.co') {
    fieldErrors.email = 'An account already uses this address. Try signing in instead.';
  }
  if (email.endsWith('@example.com')) {
    fieldErrors.email = 'Addresses on example.com cannot receive our confirmation mail.';
  }
  if (password.length > 0 && password.length < 12) {
    fieldErrors.password = 'Use at least 12 characters.';
  }

  let summary: string | null = null;
  if (!acceptedTerms) {
    summary = 'You need to accept the terms of service before we can create the account.';
  } else if (Object.keys(fieldErrors).length > 0) {
    summary = 'We could not create your account. Check the highlighted fields and try again.';
  }

  return { fieldErrors, summary };
}

function SignUpScreen({
  initialErrors = {},
  initialSummary = null,
}: {
  /** Field errors already known before the first submit, keyed by field name. */
  initialErrors?: FieldErrors;
  /** Summary message rendered in the `Alert` above the form. */
  initialSummary?: string | null;
}) {
  const [errors, setErrors] = useState<FieldErrors>(initialErrors);
  const [summary, setSummary] = useState<string | null>(initialSummary);
  const [created, setCreated] = useState(false);

  return (
    <div className={styles.authPage}>
      <Card.Root variant="elevated" className={styles.authCard}>
        <Card.Header>
          <h1 className={styles.authTitle}>Create your account</h1>
          <Card.Description>
            Free for 14 days on the Team plan. No card needed until you invite someone.
          </Card.Description>
        </Card.Header>

        <Card.Body>
          <div className={styles.stack}>
            {summary ? (
              <Alert
                variant="danger"
                title="Sign-up failed"
                onDismiss={() => setSummary(null)}
                dismissLabel="Dismiss sign-up error"
              >
                {summary}
              </Alert>
            ) : null}

            <Form
              errors={errors}
              onFormSubmit={(values) => {
                const result = fakeSignUp(values);
                setErrors(result.fieldErrors);
                setSummary(result.summary);
                setCreated(result.summary === null && Object.keys(result.fieldErrors).length === 0);
              }}
            >
              <TextField
                label="Full name"
                name="fullName"
                autoComplete="name"
                placeholder="Nadia Okonkwo"
                required
              />
              <TextField
                label="Work email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                defaultValue="nadia@northwind.co"
                required
                description="We send one confirmation message and nothing else."
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                description="At least 12 characters. A passphrase beats a clever short one."
              />

              <Checkbox
                name="terms"
                label="I accept the terms of service"
                description="Including the data processing addendum for teams in the EU."
              />

              <Button type="submit" fullWidth>
                Create account
              </Button>

              {created ? (
                <p className={styles.successNote}>
                  Account created. Check your inbox for the confirmation link.
                </p>
              ) : null}
            </Form>
          </div>
        </Card.Body>

        <Card.Footer>
          <p className={styles.authFooter}>
            Already have an account?{' '}
            <a className={styles.link} href="#sign-in">
              Sign in
            </a>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}

/**
 * A centred sign-up card: the smallest complete screen in the system, and the
 * one that decides whether validation feels trustworthy.
 *
 * What it is showing off:
 *
 * - **The real `Form` validation flow.** Base UI's `Form` collects every
 *   `Field.Root` inside it, runs constraint validation on submit, and focuses
 *   the first control that failed. Server problems come back through `errors`
 *   keyed by field name and render in each field's own `Field.Error` — nothing
 *   here tracks error state per input.
 * - **Two levels of error, deliberately separated.** A problem that belongs to
 *   one field is shown under that field; a problem that belongs to the whole
 *   submission (the unticked terms box) is an `Alert` above the form. Mixing
 *   the two is the usual reason forms feel noisy.
 * - **`Alert variant="danger"` for a summary that must interrupt.** It renders
 *   `role="alert"`, so it is announced when it appears rather than waiting for
 *   focus to reach it, and it is dismissible.
 * - **One decisive action.** A single full-width primary `Button`; the escape
 *   route ("Sign in") is a link in the card footer, not a competing button.
 *
 * Submit the default story as-is to watch the round trip: the pre-filled email
 * is taken and the terms box is empty, so both levels of error appear at once.
 */
const meta = {
  title: 'Patterns/Sign-up form',
  component: SignUpScreen,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SignUpScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The empty-ish state. Press **Create account** without changing anything: the
 * password is missing (client-side), the email is already taken (server-side)
 * and the terms box is unticked (summary-level).
 */
export const Default: Story = {};

/**
 * The error state already visible, without needing a submit — the state a
 * server-rendered page lands in after a failed POST. The summary `Alert` and
 * the per-field message under **Work email** are both present on first paint.
 */
export const WithServerError: Story = {
  args: {
    initialErrors: {
      email: 'An account already uses this address. Try signing in instead.',
      password: 'Use at least 12 characters.',
    },
    initialSummary: 'We could not create your account. Check the highlighted fields and try again.',
  },
};

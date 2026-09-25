import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form, FormActions } from './Form';
import type { FormProps } from './Form';
import { TextField } from '../TextField';
import { Button } from '../Button';

const meta = {
  title: 'Components/Forms/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Stands in for a server round trip: the submitted values are checked, and any
 * problems are handed back through the `errors` prop keyed by field name.
 */
function fakeServerResponse(values: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const username = String(values.username ?? '').trim();
  const email = String(values.email ?? '').trim();

  if (username.toLowerCase() === 'admin') {
    errors.username = 'That username is already taken.';
  }
  if (email.endsWith('@example.com')) {
    errors.email = 'Addresses on example.com cannot receive mail.';
  }
  return errors;
}

function SignUpForm(props: FormProps) {
  const [errors, setErrors] = useState<FormProps['errors']>({});
  const [created, setCreated] = useState(false);

  return (
    <Form
      {...props}
      errors={errors}
      onFormSubmit={(values) => {
        const nextErrors = fakeServerResponse(values);
        setErrors(nextErrors);
        setCreated(Object.keys(nextErrors).length === 0);
      }}
    >
      <TextField
        label="Username"
        name="username"
        defaultValue="admin"
        required
        description="Editing a field clears the error the server sent for it."
      />
      <TextField
        label="Email address"
        name="email"
        type="email"
        defaultValue="ada@example.com"
        required
      />
      <FormActions>
        <Button type="submit">Create account</Button>
      </FormActions>
      {created ? (
        <p style={{ margin: 0, fontSize: 14, color: 'var(--sds-color-content-muted)' }}>
          Account created.
        </p>
      ) : null}
    </Form>
  );
}

/**
 * Submit as-is: both values are rejected by the fake server and the messages
 * appear under each control through `Field.Error`. Focus moves to the first
 * field that failed.
 */
export const Default: Story = {
  render: (args) => <SignUpForm {...args} />,
};

/** Errors that were already known before the first submit render immediately. */
export const WithInitialServerErrors: Story = {
  render: (args) => (
    <Form {...args} errors={{ username: 'That username is already taken.' }}>
      <TextField label="Username" name="username" defaultValue="admin" required />
      <TextField label="Email address" name="email" type="email" required />
      <FormActions>
        <Button type="submit">Create account</Button>
      </FormActions>
    </Form>
  ),
};

/** `validationMode="onBlur"` checks each field as soon as it loses focus. */
export const ValidateOnBlur: Story = {
  args: { validationMode: 'onBlur' },
  render: (args) => (
    <Form {...args}>
      <TextField
        label="Username"
        name="username"
        required
        description="Focus, then blur without typing."
      />
      <TextField label="Email address" name="email" type="email" required />
      <FormActions>
        <Button type="submit">Create account</Button>
      </FormActions>
    </Form>
  ),
};

/** A form that is waiting on something: every control and the submit are disabled. */
export const Disabled: Story = {
  render: (args) => (
    <Form {...args}>
      <TextField label="Username" name="username" defaultValue="ada" disabled />
      <TextField label="Email address" name="email" defaultValue="ada@lovelace.dev" disabled />
      <FormActions>
        <Button type="submit" disabled>
          Create account
        </Button>
      </FormActions>
    </Form>
  ),
};

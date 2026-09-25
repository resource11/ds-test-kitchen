import { Form as BaseForm } from '@base-ui/react/form';
import type { FormProps as BaseFormProps } from '@base-ui/react/form';
import styles from './Form.module.css';

type BaseProps = BaseFormProps<Record<string, unknown>>;

export type FormProps = React.ComponentPropsWithoutRef<'form'> & {
  /**
   * Errors returned from outside the browser, typically by a server or a form
   * action. Keys are the `name` of each `Field.Root`; every matching field is
   * marked invalid and renders the message through its `Field.Error`.
   */
  errors?: BaseProps['errors'];
  /**
   * When fields are validated.
   * `onSubmit` (default), `onBlur` or `onChange`.
   */
  validationMode?: BaseProps['validationMode'];
  /**
   * Called with the collected field values once client-side validation passes.
   * `preventDefault()` is called on the native submit event when this is used.
   */
  onFormSubmit?: BaseProps['onFormSubmit'];
};

/**
 * A native `<form>` with consolidated error handling. Base UI collects every
 * `Field.Root` inside it, runs their validation on submit, and focuses the
 * first invalid control — including errors handed back by a server through
 * the `errors` prop.
 */
export function Form({ className, ...props }: FormProps) {
  return <BaseForm className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props} />;
}

export type FormActionsProps = React.ComponentPropsWithoutRef<'div'>;

/** A right-aligned row for submit and cancel buttons. */
export function FormActions({ className, ...props }: FormActionsProps) {
  return <div className={[styles.actions, className ?? ''].filter(Boolean).join(' ')} {...props} />;
}

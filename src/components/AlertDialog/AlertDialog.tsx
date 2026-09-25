import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import styles from './AlertDialog.module.css';

/**
 * A modal confirmation dialog for actions that are destructive or hard to undo.
 * Composed from Base UI's parts so consumers keep control of the trigger and the
 * actions, while focus trapping, scroll locking and `role="alertdialog"` come
 * from the primitive.
 *
 * Outside-click dismissal is impossible by construction, not by configuration.
 * `AlertDialog.Root` omits `modal` and `disablePointerDismissal` from its public
 * props - they are in the `Omit<DialogRoot.Props, ...>` in
 * `alert-dialog/root/AlertDialogRoot.d.ts` - and the root is nothing but
 * `useRenderDialogRoot('alert-dialog', props)`, which forces both from that mode
 * flag: `const modal = isAlertDialog ? true : modalProp` and
 * `const disablePointerDismissal = isAlertDialog || disablePointerDismissalProp`
 * (see `dialog/root/useRenderDialogRoot.js`). So there is no prop to pass and no
 * way to opt out: a click on the backdrop never closes it. Escape and the
 * explicit `AlertDialog.Close` buttons remain the only exits, which is exactly
 * the behaviour this component is for.
 *
 * An `onClick` on an element passed to `AlertDialog.Close` via `render` is
 * MERGED with the close behaviour, not swapped for it. `evaluateRenderProp` in
 * `internals/useRenderElement.js` calls `mergeProps(internalProps, render.props)`,
 * and for any `on*` prop `mergeProps` delegates to
 * `mergeEventHandlers(ourHandler, theirHandler)` in `merge-props/mergeProps.js`,
 * which runs `theirHandler` - yours, the rightmost - first and then Base UI's
 * own. So
 * `<AlertDialog.Close render={<Button onClick={deleteIt}>Delete</Button>} />`
 * runs `deleteIt` and then closes: both, in that order, with no extra wiring.
 * Overriding is not on offer; the only way to suppress the close is to call
 * `event.preventBaseUIHandler()` inside your handler, which sets the
 * `baseUIHandlerPrevented` flag that `mergeEventHandlers` checks before running
 * Base UI's handler.
 *
 * ## Confirming an action chosen from a row menu
 *
 * Do not put `AlertDialog.Trigger` (or a whole `AlertDialog.Root`) inside a
 * `Menu.Content`. Choosing an item closes the menu, and `Menu.Portal` defaults
 * to `keepMounted={false}`, so the popup subtree unmounts on selection and
 * takes the trigger with it: the dialog never gets to open.
 *
 * The pattern that works is to keep the alert dialog outside the menu and drive
 * it from state: the menu item records which row is pending, and
 * `AlertDialog.Root` is controlled with `open`/`onOpenChange` derived from that
 * state. One dialog serves the whole table, and it stays mounted after the menu
 * has gone. See the `FromAMenu` story for the full shape.
 *
 * Usage:
 *   <AlertDialog.Root>
 *     <AlertDialog.Trigger render={<Button variant="danger">Delete</Button>} />
 *     <AlertDialog.Content title="Delete project?" description="This cannot be undone.">
 *       <AlertDialog.Actions>
 *         <AlertDialog.Close render={<Button variant="secondary">Cancel</Button>} />
 *         <AlertDialog.Close render={<Button variant="danger">Delete</Button>} />
 *       </AlertDialog.Actions>
 *     </AlertDialog.Content>
 *   </AlertDialog.Root>
 */

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
  typeof BaseAlertDialog.Popup
> & {
  /** Accessible name for the dialog. Rendered as the heading. */
  title: string;
  /** Optional supporting copy, wired up as the dialog's accessible description. */
  description?: string;
};

function Content({ title, description, children, className, ...props }: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={styles.backdrop} />
      <BaseAlertDialog.Popup
        className={[styles.popup, className ?? ''].filter(Boolean).join(' ')}
        {...props}
      >
        <BaseAlertDialog.Title className={styles.title}>{title}</BaseAlertDialog.Title>
        {description ? (
          <BaseAlertDialog.Description className={styles.description}>
            {description}
          </BaseAlertDialog.Description>
        ) : null}
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

function Actions({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={[styles.actions, className ?? ''].filter(Boolean).join(' ')} {...props} />;
}

export const AlertDialog = Object.assign(Content, {
  Root: BaseAlertDialog.Root,
  Trigger: BaseAlertDialog.Trigger,
  Close: BaseAlertDialog.Close,
  Content,
  Actions,
});

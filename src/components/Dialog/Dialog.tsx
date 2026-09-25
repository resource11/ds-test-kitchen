import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import styles from './Dialog.module.css';

/**
 * A modal dialog. Composed from Base UI's parts so consumers keep full
 * control of the trigger and the content, while focus trapping, scroll
 * locking and escape handling come from the primitive.
 *
 * Usage:
 *   <Dialog.Root>
 *     <Dialog.Trigger render={<Button>Open</Button>} />
 *     <Dialog.Content title="Title" description="Optional">...</Dialog.Content>
 *   </Dialog.Root>
 */

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> {
  title: string;
  description?: string;
}

function Content({ title, description, children, className, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={styles.backdrop} />
      <BaseDialog.Popup
        className={[styles.popup, className ?? ''].filter(Boolean).join(' ')}
        {...props}
      >
        <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
        {description ? (
          <BaseDialog.Description className={styles.description}>
            {description}
          </BaseDialog.Description>
        ) : null}
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

function Actions({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={[styles.actions, className ?? ''].filter(Boolean).join(' ')} {...props} />;
}

export const Dialog = Object.assign(Content, {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Close: BaseDialog.Close,
  Content,
  Actions,
});

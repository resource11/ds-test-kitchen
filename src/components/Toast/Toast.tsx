import { Toast as BaseToast } from '@base-ui/react/toast';
import styles from './Toast.module.css';

/**
 * Transient notifications. This one is shaped differently from the other
 * overlays: there is no trigger and no `Root` you render yourself. Toasts are
 * pushed imperatively into a manager and the viewport renders whatever is in
 * the queue.
 *
 * Three pieces, all verified against `toast/index.parts.d.ts`:
 *
 * 1. `Toast.Provider` owns the queue. Mount it once, high in the tree.
 * 2. `Toast.Viewport` renders the queue. Drop it inside the provider; it
 *    portals itself to `<body>` and renders one `Toast.Root` per queued toast.
 * 3. `Toast.useToastManager()` is the hook, called from any component inside
 *    the provider. It returns `{ toasts, add, close, update, promise }`;
 *    `add({ title, description, type, timeout, actionProps })` returns the new
 *    toast's id. `Toast.createToastManager()` is the escape hatch for firing
 *    toasts from outside React.
 *
 * Usage:
 *   <Toast.Provider>
 *     <App />
 *     <Toast.Viewport />
 *   </Toast.Provider>
 *
 *   const toast = Toast.useToastManager();
 *   toast.add({ title: 'Saved', description: 'Your changes are live.' });
 */

export type ToastViewportProps = React.ComponentPropsWithoutRef<typeof BaseToast.Viewport>;

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/**
 * One `Toast.Root` per queued toast. `Toast.Title` and `Toast.Description`
 * fall back to the toast object's own `title` / `description` when given no
 * children, and render nothing when both are absent; `Toast.Action` renders
 * only when the toast was added with `actionProps`.
 */
function List() {
  const { toasts } = BaseToast.useToastManager();

  return (
    <>
      {toasts.map((toast) => (
        <BaseToast.Root key={toast.id} toast={toast} className={styles.root}>
          <BaseToast.Content className={styles.content}>
            <BaseToast.Title className={styles.title} />
            <BaseToast.Description className={styles.description} />
            <BaseToast.Action className={styles.action} />
          </BaseToast.Content>
          <BaseToast.Close className={styles.close} aria-label="Close notification">
            <CloseIcon />
          </BaseToast.Close>
        </BaseToast.Root>
      ))}
    </>
  );
}

/**
 * The portalled, fixed-position stack. Renders the default toast layout; pass
 * `children` to render the queue yourself with `Toast.useToastManager()`.
 */
function Viewport({ className, children, ...props }: ToastViewportProps) {
  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        className={[styles.viewport, className ?? ''].filter(Boolean).join(' ')}
        {...props}
      >
        {children ?? <List />}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

export const Toast = Object.assign(Viewport, {
  Provider: BaseToast.Provider,
  Viewport,
  Root: BaseToast.Root,
  Content: BaseToast.Content,
  Title: BaseToast.Title,
  Description: BaseToast.Description,
  Action: BaseToast.Action,
  Close: BaseToast.Close,
  useToastManager: BaseToast.useToastManager,
  createToastManager: BaseToast.createToastManager,
});

/**
 * Public surface of the Sample Design System.
 *
 * Importing this file also pulls in the token layer, so consumers get
 * primitives, semantic tokens and the reset by importing the library.
 */
import './tokens/base.css';

/* Actions */
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { IconButton } from './components/IconButton';
export type { IconButtonProps, IconButtonVariant, IconButtonSize } from './components/IconButton';

export { Toggle } from './components/Toggle';
export type { ToggleProps, ToggleVariant, ToggleSize } from './components/Toggle';

export { ToggleGroup } from './components/ToggleGroup';
export type { ToggleGroupProps } from './components/ToggleGroup';

/* Forms */
export { TextField } from './components/TextField';
export type { TextFieldProps } from './components/TextField';

export { Textarea } from './components/Textarea';
export type { TextareaProps, TextareaResize } from './components/Textarea';

export { NumberField } from './components/NumberField';
export type { NumberFieldProps } from './components/NumberField';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { CheckboxGroup } from './components/CheckboxGroup';
export type { CheckboxGroupProps, CheckboxGroupOrientation } from './components/CheckboxGroup';

export { RadioGroup, RadioGroupItem } from './components/RadioGroup';
export type {
  RadioGroupProps,
  RadioGroupItemProps,
  RadioGroupOrientation,
} from './components/RadioGroup';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Slider } from './components/Slider';
export type { SliderProps } from './components/Slider';

export { Select } from './components/Select';
export type {
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupLabelProps,
  SelectFieldProps,
} from './components/Select';

export { Combobox } from './components/Combobox';
export type {
  ComboboxControlProps,
  ComboboxContentProps,
  ComboboxItemProps,
  ComboboxEmptyProps,
  ComboboxGroupLabelProps,
  ComboboxListChildren,
  ComboboxFieldProps,
} from './components/Combobox';

export { Autocomplete } from './components/Autocomplete';
export type {
  AutocompleteControlProps,
  AutocompleteContentProps,
  AutocompleteItemProps,
  AutocompleteEmptyProps,
  AutocompleteGroupLabelProps,
  AutocompleteListChildren,
  AutocompleteFieldProps,
} from './components/Autocomplete';

export { Form, FormActions } from './components/Form';
export type { FormProps, FormActionsProps } from './components/Form';

export { Fieldset } from './components/Fieldset';
export type { FieldsetRootProps, FieldsetLegendProps } from './components/Fieldset';

/* Overlays */
export { Dialog } from './components/Dialog';
export type { DialogContentProps } from './components/Dialog';

export { AlertDialog } from './components/AlertDialog';
export type { AlertDialogContentProps } from './components/AlertDialog';

export { Popover } from './components/Popover';
export type { PopoverContentProps } from './components/Popover';

export { Tooltip } from './components/Tooltip';
export type { TooltipContentProps } from './components/Tooltip';

export { PreviewCard } from './components/PreviewCard';
export type { PreviewCardContentProps } from './components/PreviewCard';

export { Toast } from './components/Toast';
export type { ToastViewportProps } from './components/Toast';

/* Navigation */
export { Tabs } from './components/Tabs';
export type {
  TabsRootProps,
  TabsListProps,
  TabsTabProps,
  TabsIndicatorProps,
  TabsPanelProps,
} from './components/Tabs';

export { Menu } from './components/Menu';
export type {
  MenuContentProps,
  MenuPositioningProps,
  MenuItemProps,
  MenuGroupProps,
  MenuGroupLabelProps,
  MenuSeparatorProps,
  MenuSubmenuTriggerProps,
} from './components/Menu';

export { Menubar } from './components/Menubar';
export type { MenubarRootProps, MenubarTriggerProps } from './components/Menubar';

export { ContextMenu } from './components/ContextMenu';
export type { ContextMenuContentProps, ContextMenuTriggerProps } from './components/ContextMenu';

export { NavigationMenu } from './components/NavigationMenu';
export type {
  NavigationMenuRootProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuIconProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuPanelProps,
} from './components/NavigationMenu';

export { Toolbar } from './components/Toolbar';
export type {
  ToolbarRootProps,
  ToolbarGroupProps,
  ToolbarButtonProps,
  ToolbarLinkProps,
  ToolbarInputProps,
  ToolbarSeparatorProps,
} from './components/Toolbar';

export { Breadcrumb } from './components/Breadcrumb';
export type {
  BreadcrumbRootProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbSeparatorProps,
  BreadcrumbCurrentProps,
} from './components/Breadcrumb';

/* Content */
export { Accordion } from './components/Accordion';
export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionPanelProps,
} from './components/Accordion';

export { Collapsible } from './components/Collapsible';
export type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsiblePanelProps,
} from './components/Collapsible';

export { ScrollArea } from './components/ScrollArea';
export type { ScrollAreaProps, ScrollAreaOrientation } from './components/ScrollArea';

export { Separator } from './components/Separator';
export type { SeparatorProps, SeparatorOrientation } from './components/Separator';

/* Layout */
export { Card } from './components/Card';
export type {
  CardVariant,
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardBodyProps,
  CardFooterProps,
} from './components/Card';

export { Table } from './components/Table';
export type {
  TableRootProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableHeaderCellProps,
  TableCellProps,
} from './components/Table';

/* Display and feedback */
export { Avatar } from './components/Avatar';
export type { AvatarProps, AvatarSize } from './components/Avatar';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/Badge';

export { Alert } from './components/Alert';
export type { AlertProps, AlertVariant } from './components/Alert';

export { Progress } from './components/Progress';
export type { ProgressProps, ProgressSize } from './components/Progress';

export { Meter } from './components/Meter';
export type { MeterProps, MeterVariant, MeterSize } from './components/Meter';

export { Spinner } from './components/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/Spinner';

/** Breakpoints are generated from tokens/tier-1-definitions/breakpoint.json.
 *  They are exported as values because a CSS custom property cannot be used
 *  inside a media query. */
export { breakpoints } from './tokens/breakpoints';
export type { Breakpoint } from './tokens/breakpoints';

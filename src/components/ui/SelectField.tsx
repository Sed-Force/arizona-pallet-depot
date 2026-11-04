"use client";

import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type SelectFieldProps = {
  /** Form field name; Listbox submits the value through a hidden input. */
  name: string;
  /** Accessible label (visually hidden, like the site's other form fields). */
  label: string;
  placeholder: string;
  options: string[];
  className?: string;
  /** Called with the chosen option, for forms that react to the choice. */
  onChange?: (value: string) => void;
};

/**
 * Dropdown styled to match the site's inputs and cards, replacing the browser's native <select>.
 * The caret sits inset inside the field, and the open menu floats as a surface card.
 */
export function SelectField({ name, label, placeholder, options, className, onChange }: SelectFieldProps) {
  const [value, setValue] = useState("");

  return (
    <Listbox
      name={name}
      value={value}
      onChange={(next: string) => {
        setValue(next);
        onChange?.(next);
      }}
    >
      <Label className="sr-only">{label}</Label>
      <ListboxButton
        className={cn(
          "group relative w-full rounded-lg border border-border-strong bg-surface py-2.5 pr-11 pl-3 text-left focus:outline-none data-focus:border-primary data-focus:ring-2 data-focus:ring-primary/20 data-open:border-primary hover:cursor-pointer",
          className,
        )}
      >
        <span className={cn("block truncate", !value && "text-subtle")}>{value || placeholder}</span>
        <span className="pointer-events-none absolute inset-y-1.5 right-1.5 flex w-8 items-center justify-center rounded-md bg-surface-2 text-muted transition-colors group-data-open:bg-primary group-data-open:text-on-primary group-hover:bg-primary group-hover:text-on-primary">
          <ExpandMoreIcon fontSize="small" className="transition-transform duration-200 group-data-open:rotate-180" />
        </span>
      </ListboxButton>

      <ListboxOptions
        anchor={{ to: "bottom start", gap: 6 }}
        // Non-modal: a modal menu makes the rest of the page inert (and locks scroll) while open, so if it
        // ever fails to close, the page is left unclickable. Non-modal still closes on any outside click.
        modal={false}
        transition
        className="z-50 min-w-(--button-width) rounded-xl border border-border bg-surface-3 p-1 shadow-lg focus:outline-none transition duration-150 ease-out data-closed:-translate-y-1 data-closed:opacity-0"
      >
        {options.map((option) => (
          <ListboxOption
            key={option}
            value={option}
            className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 whitespace-nowrap text-foreground-2 data-focus:bg-surface-2 data-selected:font-semibold data-selected:text-link"
          >
            {option}
            <CheckIcon fontSize="small" className="invisible text-link group-data-selected:visible" />
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useHoldRepeat } from "./useHoldRepeat";

type QuantityFieldProps = {
  id: string;
  name?: string;
  placeholder?: string;
  min?: number;
  /** Names what the −/+ buttons change, e.g. "Decrease Value Pallets". */
  label?: string;
  /** Pass `value` and `onChange` to control the field; leave both out to let it keep its own value. */
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
};

// Same inset tile as SelectField's caret, so steppers and dropdowns read as one family.
const stepButton =
  "flex w-8 touch-manipulation select-none items-center justify-center rounded-md bg-surface-2 text-muted transition-colors hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40 hover:cursor-pointer";

/**
 * Number input with inset −/+ buttons in place of the browser's spinner arrows,
 * which render differently per browser and don't match the site's fields.
 */
export function QuantityField({
  id,
  name,
  placeholder,
  min = 1,
  label = "quantity",
  value: controlledValue,
  onChange,
  className,
}: QuantityFieldProps) {
  const [ownValue, setOwnValue] = useState("");
  const controlled = controlledValue !== undefined;
  const value = controlled ? String(controlledValue) : ownValue;
  const current = Number(value);
  const hasValue = value !== "" && Number.isFinite(current);
  const clamp = (n: number) => (Number.isFinite(n) ? Math.max(min, Math.floor(n)) : min);

  // Uncontrolled: functional update so rapid clicks each build on the latest value. An empty field starts at min.
  // Controlled: useHoldRepeat calls the latest closure, so `controlledValue` is current on every repeat.
  const step = (delta: number) => {
    if (controlled) return onChange?.(clamp(controlledValue + delta));
    setOwnValue((prev) => {
      const n = Number(prev);
      return String(prev === "" || !Number.isFinite(n) ? min : Math.max(min, n + delta));
    });
  };
  const decrease = useHoldRepeat(() => step(-1));
  const increase = useHoldRepeat(() => step(1));

  return (
    <div className={cn("relative", className)}>
      <input
        id={id}
        name={name}
        type="number"
        min={min}
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={(e) => (controlled ? onChange?.(clamp(e.target.valueAsNumber)) : setOwnValue(e.target.value))}
        // Hide the native spinners (WebKit/Blink pseudo-elements; Firefox via textfield appearance).
        className="w-full [appearance:textfield] disabled:cursor-not-allowed disabled:opacity-60 rounded-lg border border-border-strong bg-surface py-2.5 pr-[4.75rem] pl-3 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <div className="absolute inset-y-1.5 right-1.5 flex gap-1">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          aria-controls={id}
          disabled={!hasValue || current <= min}
          {...decrease}
          className={stepButton}
        >
          <RemoveIcon fontSize="small" />
        </button>
        <button type="button" aria-label={`Increase ${label}`} aria-controls={id} {...increase} className={stepButton}>
          <AddIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

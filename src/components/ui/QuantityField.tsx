"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { cn } from "@/lib/cn";

type QuantityFieldProps = {
  id: string;
  name: string;
  placeholder: string;
  min?: number;
  className?: string;
};

// Same inset tile as SelectField's caret, so steppers and dropdowns read as one family.
const stepButton =
  "flex w-8 items-center justify-center rounded-md bg-surface-2 text-muted transition-colors hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40";

/**
 * Number input with inset −/+ buttons in place of the browser's spinner arrows,
 * which render differently per browser and don't match the site's fields.
 */
export function QuantityField({ id, name, placeholder, min = 1, className }: QuantityFieldProps) {
  const [value, setValue] = useState("");
  const current = Number(value);
  const hasValue = value !== "" && Number.isFinite(current);

  // Functional update so rapid clicks each build on the latest value. An empty field starts at min.
  const step = (delta: number) =>
    setValue((prev) => {
      const n = Number(prev);
      return String(prev === "" || !Number.isFinite(n) ? min : Math.max(min, n + delta));
    });

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
        onChange={(e) => setValue(e.target.value)}
        // Hide the native spinners (WebKit/Blink pseudo-elements; Firefox via textfield appearance).
        className="w-full [appearance:textfield] rounded-lg border border-border-strong bg-surface py-2.5 pr-[4.75rem] pl-3 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <div className="absolute inset-y-1.5 right-1.5 flex gap-1">
        <button
          type="button"
          aria-label="Decrease quantity"
          aria-controls={id}
          disabled={!hasValue || current <= min}
          onClick={() => step(-1)}
          className={stepButton}
        >
          <RemoveIcon fontSize="small" />
        </button>
        <button type="button" aria-label="Increase quantity" aria-controls={id} onClick={() => step(1)} className={stepButton}>
          <AddIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

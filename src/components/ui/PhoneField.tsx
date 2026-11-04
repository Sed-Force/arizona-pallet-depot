"use client";

import { useState } from "react";
import { fieldClasses } from "@/components/ui/fieldClasses";
import { formatPhone, phoneDigits, phonePattern } from "@/lib/phone";

type PhoneFieldProps = {
  id: string;
  name: string;
  required?: boolean;
  placeholder?: string;
};

/**
 * US phone input that keeps digits only and formats them as "(602) 555 - 0100" while the visitor types.
 * Submits the formatted number; the browser blocks submitting anything short of 10 digits.
 */
export function PhoneField({ id, name, required, placeholder = "Phone" }: PhoneFieldProps) {
  const [digits, setDigits] = useState("");
  const formatted = formatPhone(digits);

  return (
    <input
      id={id}
      name={name}
      type="tel"
      inputMode="numeric"
      autoComplete="tel-national"
      required={required}
      placeholder={placeholder}
      pattern={phonePattern}
      title="10-digit phone number, numbers only"
      value={formatted}
      onChange={(e) => {
        let next = phoneDigits(e.target.value);
        // Backspacing over formatting (") " or " - ") removes no digit; take the digit before it instead.
        if (next === digits && e.target.value.length < formatted.length) next = next.slice(0, -1);
        setDigits(next);
      }}
      className={fieldClasses}
    />
  );
}

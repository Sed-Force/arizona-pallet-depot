/** The 10 digits of a US phone number typed or pasted in any format; a leading country code 1 is dropped. */
export function phoneDigits(input: string) {
  const digits = input.replace(/\D/g, "");
  return (digits.length > 10 && digits.startsWith("1") ? digits.slice(1) : digits).slice(0, 10);
}

/**
 * Formats digits as "(602) 555 - 0100", the site's phone style. Partial input formats as far as it goes
 * ("(602) 5"), so a field can format while the visitor types.
 */
export function formatPhone(digits: string) {
  if (!digits) return "";
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);
  if (!prefix) return `(${area}`;
  if (!line) return `(${area}) ${prefix}`;
  return `(${area}) ${prefix} - ${line}`;
}

/** A complete formatted number, as a regex `pattern` for inputs (anchored by the browser). */
export const phonePattern = String.raw`\(\d{3}\) \d{3} - \d{4}`;

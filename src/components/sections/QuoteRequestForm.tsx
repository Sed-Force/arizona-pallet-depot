"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendQuoteRequest } from "@/lib/quoteRequest";
import { links, site } from "@/lib/site";

/**
 * The quote form's <form>: once the browser has validated the fields, sends them to Formspree and moves on to
 * the thanks page. The submit button inside is disabled while sending (it sits in the fieldset).
 */
export function QuoteRequestForm({ children, className }: { children: React.ReactNode; className?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        if (await sendQuoteRequest(new FormData(e.currentTarget))) router.push("/thanks");
        else setStatus("failed");
      }}
    >
      <fieldset disabled={status === "sending"} aria-busy={status === "sending"} className={className}>
        {children}
      </fieldset>

      {status === "failed" && (
        <p role="alert" className="mt-4 rounded-lg border border-warning-border bg-warning-soft p-4 text-sm text-warning-foreground">
          Sorry, your request didn’t go through. Please try again, or reach us at{" "}
          <a href={links.mailto} className="font-semibold underline">{site.email}</a> or{" "}
          <a href={links.tel} className="font-semibold underline">{site.phone.display}</a>.
        </p>
      )}
    </form>
  );
}

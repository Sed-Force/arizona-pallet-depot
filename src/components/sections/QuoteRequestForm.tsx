"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { sendQuoteRequest } from "@/lib/quoteRequest";
import { links, site } from "@/lib/site";

/**
 * The quote form's <form>: once the browser has validated the fields, sends them to Formspree and moves on to
 * the thanks page. The fields stay editable throughout; only the submit button is held while sending.
 */
export function QuoteRequestForm({ children, className }: { children: React.ReactNode; className?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const sending = status === "sending";

  return (
    <form
      aria-busy={sending}
      onSubmit={async (e) => {
        e.preventDefault();
        if (sending) return; // one request at a time
        setStatus("sending");
        const sent = await sendQuoteRequest(new FormData(e.currentTarget));
        // Back to idle either way: Next.js keeps this page mounted after navigating away, so a visitor who comes
        // back from /thanks finds the form ready to edit and send again.
        setStatus(sent ? "idle" : "failed");
        if (sent) router.push("/thanks");
      }}
    >
      {/* Not disabling the fields themselves keeps them editable; the submit button just looks and acts held. */}
      <div
        className={cn(
          className,
          sending && "[&_[type=submit]]:pointer-events-none [&_[type=submit]]:opacity-60",
        )}
      >
        {children}
      </div>

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

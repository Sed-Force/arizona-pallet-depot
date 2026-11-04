// Kept server-side (no NEXT_PUBLIC_ prefix) so the form IDs never reach the browser; the forms submit through
// server functions in quoteRequest.ts and orderNotice.ts, the only modules that import this one.
const endpoints = {
  quote: process.env.FORMSPREE_PRIVATE_QUOTE_ENDPOINT,
  order: process.env.FORMSPREE_PRIVATE_ORDER_ENDPOINT,
};

/** Posts a submission to one of the Formspree forms. Resolves false if it didn't go through. */
export async function postToFormspree(form: keyof typeof endpoints, submission: Record<string, string>) {
  const endpoint = endpoints[form];
  if (!endpoint) {
    console.error(`Formspree ${form} endpoint is not set. Add FORMSPREE_PRIVATE_${form.toUpperCase()}_ENDPOINT to .env.local (see .env.example).`);
    return false;
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(submission),
      // Don't leave the visitor waiting on a slow service; past this they're asked to call or email instead.
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error(`Formspree ${form} submission failed: ${res.status} ${await res.text()}`);
    return res.ok;
  } catch (err) {
    console.error(`Formspree ${form} submission failed:`, err);
    return false;
  }
}

import { callBatmanAction } from "./actions";

const ERROR_MESSAGES: Record<string, string> = {
  not_allowed:
    "Gotham PD says no. Try Batman's pager — and good luck with that.",
  alert_failed:
    "The Bat-Signal flickered out. Take a breath and try again, citizen.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <main>
      <h1>Bat-Signal Hotline</h1>
      <p className="tagline">
        Type a name. Light the sky. Hope for the best.
      </p>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <form action={callBatmanAction}>
        <input
          type="text"
          name="victim_name"
          placeholder="e.g. Commissioner Gordon"
          aria-label="Name of the cop in distress"
          autoComplete="off"
          required
        />
        <button type="submit">Light the Signal</button>
      </form>

      <p className="fineprint">
        Service hours: dusk till dawn. Riddlers and clowns ineligible.
      </p>
    </main>
  );
}

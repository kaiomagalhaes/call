import { callBatmanAction } from "./actions";

const ERROR_MESSAGES: Record<string, string> = {
  not_allowed:
    "It sounds like you're not allowed to call Batman here, try his phone number instead.",
  alert_failed:
    "We couldn't reach Batman right now. Please try again in a moment.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <>
      <h1>Call Batman</h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <form action={callBatmanAction}>
        <input
          type="text"
          name="victim_name"
          placeholder="Enter Cop's Name"
          required
        />
        <br />
        <button type="submit">Call Batman</button>
      </form>
    </>
  );
}

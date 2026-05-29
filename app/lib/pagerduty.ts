export async function triggerBatmanAlert(
  requesterName: string,
): Promise<boolean> {
  const routingKey = process.env.PAGERDUTY_ROUTING_KEY;
  if (!routingKey) {
    throw new Error("PAGERDUTY_ROUTING_KEY is not set");
  }

  const payload = {
    routing_key: routingKey,
    event_action: "trigger",
    payload: {
      summary: `Batman is needed! Requested by ${requesterName}`,
      source: "bat-signal",
      severity: "critical",
      component: "bat-signal system",
      group: "Justice League",
      class: "emergency",
      custom_details: {
        requested_by: requesterName,
      },
    },
  };

  const response = await fetch("https://events.pagerduty.com/v2/enqueue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return response.status === 202;
}

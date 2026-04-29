"use server";

import { redirect } from "next/navigation";
import { isAllowedVictim } from "./lib/allowed-victims";
import { triggerBatmanAlert } from "./lib/pagerduty";

export async function callBatmanAction(formData: FormData): Promise<void> {
  const victimName = formData.get("victim_name");
  const name = typeof victimName === "string" ? victimName : "";

  if (!isAllowedVictim(name)) {
    redirect("/?error=not_allowed");
  }

  let success = false;
  try {
    success = await triggerBatmanAlert();
  } catch {
    success = false;
  }

  redirect(success ? "/success" : "/?error=alert_failed");
}

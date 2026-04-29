import { NextResponse } from "next/server";
import { isAllowedVictim } from "@/app/lib/allowed-victims";
import { triggerBatmanAlert } from "@/app/lib/pagerduty";

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const victimName = formData.get("victim_name");
  const name = typeof victimName === "string" ? victimName : "";

  if (!isAllowedVictim(name)) {
    return NextResponse.redirect(
      new URL("/?error=not_allowed", request.url),
      303,
    );
  }

  let success = false;
  try {
    success = await triggerBatmanAlert();
  } catch {
    success = false;
  }

  return NextResponse.redirect(
    new URL(success ? "/success" : "/?error=alert_failed", request.url),
    303,
  );
}

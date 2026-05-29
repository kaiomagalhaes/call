import { NextResponse } from "next/server";
import { isAllowedVictim } from "@/app/lib/allowed-victims";
import { triggerBatmanAlert } from "@/app/lib/pagerduty";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ victim_name: string }> },
): Promise<Response> {
  const { victim_name } = await params;
  const name = decodeURIComponent(victim_name);

  if (!isAllowedVictim(name)) {
    return NextResponse.redirect(new URL("/?error=1", request.url));
  }

  const success = await triggerBatmanAlert(name);
  return NextResponse.redirect(
    new URL(success ? "/success" : "/", request.url),
  );
}

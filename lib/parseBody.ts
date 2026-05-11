export async function parseBody(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const j = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(j).map(([k, v]) => [k, v === undefined || v === null ? "" : String(v)]),
    );
  }
  if (ct.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    return Object.fromEntries(new URLSearchParams(text).entries());
  }
  if (ct.includes("multipart/form-data")) {
    const fd = await req.formData();
    const o: Record<string, string> = {};
    for (const [k, v] of fd.entries()) {
      if (typeof v === "string") o[k] = v;
    }
    return o;
  }
  return {};
}

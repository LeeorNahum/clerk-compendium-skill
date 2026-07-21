export async function POST(request: Request) {
  const { orgId, recordId } = await request.json();
  return Response.json({ orgId, recordId, updated: true });
}

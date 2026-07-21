export async function POST(request: Request) {
  const event = await request.json();
  await database.users.upsert(event.data.id, event.data);
  return new Response("ok");
}

declare const database: {
  users: { upsert(id: string, value: unknown): Promise<void> };
};

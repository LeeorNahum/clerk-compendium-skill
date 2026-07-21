export async function loader() {
  return Response.json({ privateNote: "visible without authentication" });
}

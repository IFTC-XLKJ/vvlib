async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
}
Deno.server(handleRequest);
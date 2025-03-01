async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  if (pathname == "/NavBar") {
    const body = await Deno.readTextFile("./NavBar.js");
    return new Response(body, {
      headers: {
        "content-type": "application/javascript; charset=utf-8",
      },
    });
  }
  return new Response("Not Found", { status: 404 });
}
Deno.serve(handleRequest);
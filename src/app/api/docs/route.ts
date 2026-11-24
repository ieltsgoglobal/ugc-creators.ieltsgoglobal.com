import { creatorOpenApiDocument } from "../_lib/creator-openapi-document";

export function GET() {
  const documentJson = JSON.stringify(creatorOpenApiDocument).replace(/</g, "\\u003c");
  return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IELTS GoGlobal Creator API Reference</title>
  </head>
  <body>
    <section id="reference-fallback">
      <h1>IELTS GoGlobal Creator API</h1>
      <p><code>POST /api/v1/referrals/conversions</code> records a referred subscription sale.</p>
      <p>Request fields: <code>referralId</code>, <code>externalReference</code>, <code>subscribedAt</code>, <code>paidAmountMinor</code>, and <code>currency</code>.</p>
      <p><a href="/api/openapi.json">View the OpenAPI specification</a></p>
    </section>
    <div id="api-reference"></div>
    <script type="application/json" id="openapi-document">${documentJson}</script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
    <script>
      const specification = document.getElementById("openapi-document").textContent;
      window.Scalar?.createApiReference("#api-reference", {
        sources: [{ slug: "creator-api", content: specification }],
        servers: [{ url: window.location.origin }],
        showDeveloperTools: "never",
        hideTestRequestButton: true,
        onLoaded: () => {
          document.getElementById("reference-fallback").hidden = true;
        },
      });
    </script>
  </body>
</html>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

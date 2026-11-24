import { creatorOpenApiDocument } from "../_lib/creator-openapi-document";

export function GET() {
  return Response.json(creatorOpenApiDocument);
}

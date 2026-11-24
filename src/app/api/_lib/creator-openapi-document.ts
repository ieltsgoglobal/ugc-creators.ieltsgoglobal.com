import { z } from "zod";
import { conversionSchema } from "../v1/referrals/conversions/_lib/conversion-schema";

function jsonResponse(description: string, example: Record<string, string>) {
  return {
    description,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: Object.fromEntries(Object.keys(example).map((key) => [key, { type: "string" }])),
          required: Object.keys(example),
        },
        example,
      },
    },
  };
}

export const creatorOpenApiDocument = {
    openapi: "3.1.0",
    info: { title: "IELTS GoGlobal Creator API", version: "1.0.0" },
    servers: [{ url: "/" }],
    paths: {
      "/api/v1/referrals/conversions": {
        post: {
          operationId: "recordReferralConversion",
          summary: "Record a referred subscription sale",
          description: "Call from the payment backend after a successful referred B2C payment. Retry with the same payload. This operation records sales only.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: z.toJSONSchema(conversionSchema, { io: "input", target: "draft-2020-12" }),
                example: {
                  referralId: "creator_referral_example",
                  externalReference: "dodo:payment_example",
                  subscribedAt: "2026-11-24T12:00:00Z",
                  paidAmountMinor: 99900,
                  currency: "INR",
                },
              },
            },
          },
          responses: {
            200: jsonResponse("Identical sale already recorded.", { status: "already_recorded" }),
            201: jsonResponse("Sale recorded.", { status: "recorded" }),
            400: jsonResponse("Invalid request body.", { error: "Invalid conversion" }),
            404: jsonResponse("Referral ID was not found.", { error: "Unknown referral" }),
            409: jsonResponse("Payment reference was recorded with different details.", { error: "Payment reference already used" }),
            500: { description: "Unexpected server error. Retry with the original payload." },
          },
        },
      },
    },
};

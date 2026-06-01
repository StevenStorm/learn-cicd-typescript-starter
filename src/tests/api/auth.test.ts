import { describe, expect, test } from "vitest";
import { getAPIKey } from "../../api/auth.js";
import { IncomingHttpHeaders } from "http";

describe("Authentication API", () => {
  test("no auth header", async () => {
    const headers = {} as IncomingHttpHeaders;
    const apiKey = getAPIKey(headers);
    expect(apiKey).toBeNull();
  });

  test("malformed auth header", async () => {
    const headers = { authorization: "1111111" } as IncomingHttpHeaders;
    const apiKey = getAPIKey(headers);
    expect(apiKey).toBeNull();
  });

  test("invalid api key format", async () => {
    const headers = { authorization: "11111 22222" } as IncomingHttpHeaders;
    const apiKey = getAPIKey(headers);
    expect(apiKey).toBeNull();
  });

  test("valid api key", async () => {
    const headers = { authorization: "ApiKey 11111" } as IncomingHttpHeaders;
    const apiKey = getAPIKey(headers);
    expect(apiKey).toBe("11111");
  });
});
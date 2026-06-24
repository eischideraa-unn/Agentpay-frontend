import { metadata } from "./layout";

describe("root layout metadata", () => {
  it("keeps the home route on the default AgentPay title", () => {
    expect(metadata.title).toMatchObject({
      default: "AgentPay",
      template: "%s — AgentPay",
    });
  });
});

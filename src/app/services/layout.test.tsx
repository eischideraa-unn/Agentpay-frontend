import { metadata as servicesMetadata } from "./layout";
import { metadata as newServiceMetadata } from "./new/layout";
import { metadata as usageMetadata } from "../usage/layout";
import { metadata as agentsMetadata } from "../agents/layout";
import { metadata as adminMetadata } from "../admin/layout";
import { metadata as statsMetadata } from "../stats/layout";
import { metadata as eventsMetadata } from "../events/layout";
import { metadata as webhooksMetadata } from "../webhooks/layout";
import { metadata as apiKeysMetadata } from "../api-keys/layout";
import { metadata as searchMetadata } from "../search/layout";
import { generateMetadata as generateServiceMetadata } from "./[serviceId]/layout";
import { generateMetadata as generateServiceEditMetadata } from "./[serviceId]/edit/layout";
import { generateMetadata as generateServiceAgentsMetadata } from "./[serviceId]/agents/layout";
import { generateMetadata as generateAgentMetadata } from "../agents/[agent]/layout";

describe("route metadata", () => {
  it("exports distinct titles for client routes", () => {
    expect(servicesMetadata.title).toBe("Services");
    expect(newServiceMetadata.title).toBe("New service");
    expect(usageMetadata.title).toBe("Usage metering");
    expect(agentsMetadata.title).toBe("Agents");
    expect(adminMetadata.title).toBe("Admin");
    expect(statsMetadata.title).toBe("Stats");
    expect(eventsMetadata.title).toBe("Event log");
    expect(webhooksMetadata.title).toBe("Webhooks");
    expect(apiKeysMetadata.title).toBe("API keys");
    expect(searchMetadata.title).toBe("Search");
  });

  it("generates sensible titles for dynamic routes", async () => {
    await expect(
      generateServiceMetadata({ params: Promise.resolve({ serviceId: "svc-123" }) })
    ).resolves.toMatchObject({ title: "Service svc-123" });
    await expect(
      generateServiceEditMetadata({ params: Promise.resolve({ serviceId: "svc-123" }) })
    ).resolves.toMatchObject({ title: "Edit service svc-123" });
    await expect(
      generateServiceAgentsMetadata({ params: Promise.resolve({ serviceId: "svc-123" }) })
    ).resolves.toMatchObject({ title: "Top agents svc-123" });
    await expect(
      generateAgentMetadata({ params: Promise.resolve({ agent: "agent-9" }) })
    ).resolves.toMatchObject({ title: "Agent agent-9" });
  });
});

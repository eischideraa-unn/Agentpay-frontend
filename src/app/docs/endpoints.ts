export type ApiSection = {
  h: string;
  p: string;
  curl: string;
};

export const getSections = (baseUrl: string): ApiSection[] => [
  {
    h: "POST /api/v1/usage",
    p: "Record incremental usage for an (agent, serviceId) pair. Body: { agent, serviceId, requests }.",
    curl: `curl -X POST ${baseUrl}/api/v1/usage \
  -H "Content-Type: application/json" \
  -d '{"agent":"agent-id","serviceId":"service-id","requests":1}'`,
  },
  {
    h: "GET /api/v1/usage/:agent/:serviceId",
    p: "Read the accumulated request total. Returns { agent, serviceId, total }.",
    curl: `curl ${baseUrl}/api/v1/usage/agent-id/service-id`,
  },
  {
    h: "POST /api/v1/settle",
    p: "Drain the accumulator and return { requests, priceStroops, billedStroops }.",
    curl: `curl -X POST ${baseUrl}/api/v1/settle \
  -H "Content-Type: application/json" \
  -d '{"agent":"agent-id"}'`,
  },
  {
    h: "POST /api/v1/services",
    p: "Register a service with priceStroops/request. Idempotent.",
    curl: `curl -X POST ${baseUrl}/api/v1/services \
  -H "Content-Type: application/json" \
  -d '{"name":"my-service","priceStroops":100}'`,
  },
  {
    h: "POST /api/v1/admin/{pause,unpause}",
    p: "Toggle the global pause flag; GET /admin/status to read.",
    curl: `curl -X POST ${baseUrl}/api/v1/admin/pause`,
  },
];

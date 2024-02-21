import type { Client } from "../services/api/openapi";

export interface ApiServiceProps {
  getApiClient: () => Promise<Client>;
}

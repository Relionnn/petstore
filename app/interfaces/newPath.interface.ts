import type { HttpMethod, Parameter } from "./api.interface";

export interface NewPath {
  path: string;
  method: HttpMethod;
  tags: string;
  summary: string;
  description: string;
  operationId: string;
  produces: string[];
  parameters: Parameter[];
  responses: {
    status: string;
    description: string;
    schema?: {
      type: string;
      items?: {
        $ref: string;
      };
    };
  }[];
}

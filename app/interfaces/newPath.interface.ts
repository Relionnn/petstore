import type { Parameter } from "./api.interface";

export interface NewPath {
  path: string;
  method: "post" | "get" | "delete" | "put";
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

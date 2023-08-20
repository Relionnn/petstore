export interface Path {
  path: string;
  method: "post" | "get" | "delete" | "put";
  tags: string;
  summary: string;
  description: string;
  operationId: string;
  produces: string[];
  parameters: Parameters[];
  responses: {
    status: string;
    description: string;
    schema: {
      type: string;
      items: {
        $ref: string;
      };
    };
  }[];
}

export interface Parameters {
  name: string;
  in: string;
  description: string;
  required: true;
  type: string;
  items: {
    type: string;
  };
  collectionFormat: string;
}

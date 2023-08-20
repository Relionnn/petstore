export interface Api {
  swagger: string;
  info: Info;
  host: string;
  basePath: string;
  tags: Tag[];
  schemes: string[];
  paths: Paths;
  securityDefinitions: SecurityDefinitions;
  definitions: Definitions;
  externalDocs: ExternalDocs;
}
export interface Info {
  description: string;
  version: string;
  title: string;
  termsOfService: string;
  contact: {
    email: string;
  };
  license: {
    name: string;
    url: string;
  };
}

export interface Tag {
  name: string;
  description: string;
  externalDocs: ExternalDocs;
}

export interface ExternalDocs {
  description: string;
  url: string;
}

export interface Paths {
  [path: string]: {
    [method in HttpMethod]?: MethodDetail;
  };
}
export type HttpMethod = "post" | "get" | "delete" | "put";

export interface MethodDetail {
  tags: string[];
  summary: string;
  description: string;
  operationId: string;
  produces: string[];
  parameters: Parameter[];
  responses: {
    [status: string]: {
      description: string;
      schema?: {
        type: string;
        items?: {
          $ref: string;
        };
      };
    };
  };
}

export type ParameterLocation = "body" | "query" | "header" | "path";

export interface Parameter {
  in: ParameterLocation;
  name: string;
  description: string;
  required: boolean;
  schema?: {
    $ref: string;
  };
  type: string;
  items?: {
    type: string;
  };
  collectionFormat: string;
}

export interface SecurityDefinitions {
  [key: string]: ApiKeySecurityDefinition | OAuth2SecurityDefinition;
}

export interface ApiKeySecurityDefinition {
  type: "apiKey";
  name: string;
  in: "header" | "query" | "cookie";
}

export interface OAuth2SecurityDefinition {
  type: "oauth2";
  authorizationUrl: string;
  flow: "implicit" | "password" | "application" | "accessCode";
  scopes: {
    [scopeName: string]: string;
  };
}

export interface Definitions {
  ApiResponse: ApiResponse;
  Category: Category;
  Pet: Pet;
  Tag: Tag;
  Order: Order;
  User: User;
}

export interface BaseProperty {
  type: string;
  format?: string;
  description?: string;
  example?: any;
  enum?: string[];
}

export interface ObjectProperty extends BaseProperty {
  $ref?: string;
  items?: BaseProperty & { xml: Xml };
  xml?: Xml;
}

export interface ApiResponse {
  type: "object";
  properties: {
    code: ObjectProperty;
    type: ObjectProperty;
    message: ObjectProperty;
  };
}

export interface Category {
  type: "object";
  properties: {
    id: ObjectProperty;
    name: ObjectProperty;
  };
  xml: Xml;
}

export interface Pet {
  type: "object";
  required: string[];
  properties: {
    id: ObjectProperty;
    category: ObjectProperty;
    name: ObjectProperty;
    photoUrls: ObjectProperty;
    tags: ObjectProperty;
    status: ObjectProperty;
  };
  xml: Xml;
}

export interface Tag {
  type: "object";
  properties: {
    id: ObjectProperty;
    name: ObjectProperty;
  };
  xml: Xml;
}

export interface Order {
  type: "object";
  properties: {
    id: ObjectProperty;
    petId: ObjectProperty;
    quantity: ObjectProperty;
    shipDate: ObjectProperty;
    status: ObjectProperty;
    complete: ObjectProperty;
  };
  xml: Xml;
}

export interface User {
  type: "object";
  properties: {
    id: ObjectProperty;
    username: ObjectProperty;
    firstName: ObjectProperty;
    lastName: ObjectProperty;
    email: ObjectProperty;
    password: ObjectProperty;
    phone: ObjectProperty;
    userStatus: ObjectProperty;
  };
  xml: Xml;
}

export interface Xml {
  name: string;
  wrapped?: boolean;
}

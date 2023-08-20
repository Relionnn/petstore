export interface Api {
  swagger: string;
  info: Info;
  host: string;
  basePath: string;
  tags: Tag[];
  schemes: string[];
  paths: any;
  securityDefinitions: any;
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

export interface Definitions {
  ApiResponse: any;
}

export interface ExternalDocs {
  description: string;
  url: string;
}

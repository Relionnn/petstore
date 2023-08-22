export interface ModelProperty {
  type: string;
  description?: string;
  properties?: {
    [propName: string]: PropertyModel;
  };
  $ref?: string;
}

export interface PropertyModel {
  type: string;
  description?: string;
  $ref?: string;
}

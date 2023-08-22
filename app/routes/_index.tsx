import type { V2_MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import InfoDisplay from "~/components/InfoDisplay";
import ModelsDisplay from "~/components/ModelsDisplay";
import PathsDisplay from "~/components/PathsDisplay";
import type { Contract, Parameter } from "~/interfaces/contract.interface";
import { HttpMethod } from "~/interfaces/contract.interface";
import type { NewPath } from "~/interfaces/newPath.interface";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Smart Bear Quest" },
    { name: "Petstore Api", content: "Petstore api docs" },
  ];
};

export const loader: LoaderFunction = async () => {
  const response = await fetch("https://petstore.swagger.io/v2/swagger.json");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return data;
};

export function isMethod(method: any): method is HttpMethod {
  return Object.values(HttpMethod).includes(method);
}

export default function Index() {
  const data: Contract = useLoaderData();
  const pathsArray: NewPath[] = [];

  Object.entries(data.paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, details]) => {
      if (isMethod(method)) {
        pathsArray.push({
          path,
          method: method,
          tags: details.tags.join(", "),
          summary: details.summary,
          description: details.description,
          operationId: details.operationId,
          produces: details.produces,
          parameters: details.parameters.map((param: Parameter) => {
            let transformedParam: Parameter = {
              name: param.name,
              in: param.in,
              description: param.description,
              required: param.required,
              collectionFormat: param.collectionFormat,
            };
            if (param.type) {
              transformedParam.type = param.type;
            }
            if (param.items) {
              transformedParam.items = { type: param.items.type };
              if (param.items.$ref) {
                transformedParam.items.$ref = param.items.$ref;
              }
            }
            if (param.schema) {
              transformedParam.schema = {};
              if (param.schema.$ref) {
                transformedParam.schema.$ref = param.schema.$ref;
              }
              if (param.schema.type) {
                transformedParam.schema.type = param.schema.type;
              }
              if (param.schema.items) {
                transformedParam.schema.items = {};
                if (param.schema.items.type) {
                  transformedParam.schema.items.type = param.schema.items.type;
                }
                if (param.schema.items.$ref) {
                  transformedParam.schema.items.$ref = param.schema.items.$ref;
                }
              }
            }
            return transformedParam;
          }),
          responses: Object.entries(details.responses).map(
            ([status, responseDetails]) => ({
              status: status,
              description: responseDetails.description,
              schema: responseDetails.schema
                ? {
                    type: responseDetails.schema.type,
                    items: responseDetails.schema.items
                      ? { $ref: responseDetails.schema.items.$ref }
                      : undefined,
                  }
                : undefined,
            })
          ),
        });
      }
    });
  });

  return (
    <div className="m-4">
      {data?.info && <InfoDisplay info={data.info} />}
      {pathsArray && <PathsDisplay paths={pathsArray} />}
      {data.definitions && <ModelsDisplay definitions={data.definitions} />}
    </div>
  );
}

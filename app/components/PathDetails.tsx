import type { NewPath } from "~/interfaces/newPath.interface";
import { scrollToModel } from "~/utils/shared";

type PathDisplayProps = {
  path: NewPath;
  themeColor: string;
};

export default function PathDetails({ path, themeColor }: PathDisplayProps) {
  return (
    <div
      className={`p-4 ${themeColor} border-b-2 border-l-2 border-r-2 rounded-b-md`}
    >
      {path.description && (
        <div className="mb-4">
          <strong>Description:</strong>
          <p className="ml-2">{path.description}</p>
        </div>
      )}

      {path.operationId && (
        <div className="mb-4">
          <strong>Operation ID:</strong>
          <p className="ml-2">{path.operationId}</p>
        </div>
      )}

      {path.produces?.length > 0 && (
        <div className="mb-4">
          <strong>Produces:</strong>
          <ul className="list-disc list-inside">
            {path.produces.map((produce, index) => (
              <li key={index}>{produce}</li>
            ))}
          </ul>
        </div>
      )}
      {path.parameters?.length > 0 && (
        <div className="mb-4">
          <strong>Parameters:</strong>
          <ul className="list-disc list-inside">
            {path.parameters.map((param, index) => {
              const isBodyWithRef =
                param.name === "body" &&
                ((param.schema && param.schema.$ref) ||
                  (param.schema?.items && param.schema.items.$ref));

              const refToScrollTo = param.schema?.$ref
                ? param.schema.$ref
                : param.schema?.items?.$ref;

              return (
                <li key={index}>
                  <strong>
                    {isBodyWithRef ? (
                      <span
                        onClick={() =>
                          scrollToModel(refToScrollTo.split("/").pop())
                        }
                        className="text-blue-500 cursor-pointer"
                      >
                        {param.name} ({param.in})
                      </span>
                    ) : (
                      `${param.name} (${param.in})`
                    )}
                  </strong>{" "}
                  - {param.description}
                  {param.required && (
                    <span className="ml-2 text-red-500">(required)</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {path.responses?.length > 0 && (
        <div>
          <strong>Responses:</strong>
          <ul className="list-disc list-inside">
            {path.responses.map((response, index) => (
              <li key={index}>
                <strong>Status {response.status}</strong> -{" "}
                {response.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

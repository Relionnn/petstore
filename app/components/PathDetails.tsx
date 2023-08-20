import type { Path } from "~/interfaces/path.interface";

type PathDisplayProps = {
  path: Path;
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

      <div className="mb-4">
        <strong>Operation ID:</strong>
        <p className="ml-2">{path.operationId}</p>
      </div>

      <div className="mb-4">
        <strong>Produces:</strong>
        <ul className="list-disc list-inside">
          {path.produces.map((produce, index) => (
            <li key={index}>{produce}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <strong>Parameters:</strong>
        <ul className="list-disc list-inside">
          {path.parameters.map((param, index) => (
            <li key={index}>
              <strong>
                {param.name} ({param.in})
              </strong>{" "}
              - {param.description}
              {param.required && (
                <span className="ml-2 text-red-500">(required)</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Responses:</strong>
        <ul className="list-disc list-inside">
          {path.responses.map((response, index) => (
            <li key={index}>
              <strong>Status {response.status}</strong> - {response.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

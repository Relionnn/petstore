import type {
  ModelProperty,
  PropertyModel,
} from "~/interfaces/modeProperty.interface";

function describeProperty(property: PropertyModel): JSX.Element | string {
  if (property.$ref) {
    const modelName = property.$ref.split("/").pop();
    return (
      <a href={`#${modelName}`} className="text-blue-500">
        Reference to {modelName}
      </a>
    );
  }

  let description = property.type;
  if (property.description) {
    description += ` (${property.description})`;
  }

  return description;
}

type ModelDetailsProps = {
  model: ModelProperty;
};

export default function ModelDetails({ model }: ModelDetailsProps) {
  return (
    <div className="p-4 border-l-2 border-r-2 border-b-2 rounded-b-md">
      <div>
        <strong>Type:</strong> {model.type}
      </div>
      {model.properties ? (
        <div className="mt-2">
          <strong>Properties:</strong>
          <ul className="list-disc list-inside">
            {Object.entries(model.properties).map(
              ([propertyName, property]) => (
                <li key={propertyName}>
                  <strong>{propertyName}:</strong> {describeProperty(property)}
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="mt-2">
          <strong>No properties defined.</strong>
        </div>
      )}
    </div>
  );
}

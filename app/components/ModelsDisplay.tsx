import type { Definitions } from "~/interfaces/contract.interface";
import ModelComponent from "./ModelComponent";

type ModelsSectionProps = {
  definitions: Definitions;
};

export default function ModelsSection({ definitions }: ModelsSectionProps) {
  return (
    <section className="p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Models</h2>
      {Object.entries(definitions).map(([modelName, model]) => (
        <ModelComponent key={modelName} modelName={modelName} model={model} />
      ))}
    </section>
  );
}

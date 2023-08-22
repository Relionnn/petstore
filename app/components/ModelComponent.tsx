import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import ModelDetails from "./ModelDetails";
import type { ModelProperty } from "~/interfaces/modeProperty.interface";

type ModelComponentProps = {
  modelName: string;
  model: ModelProperty;
};

export default function ModelComponent({
  modelName,
  model,
}: ModelComponentProps) {
  const [showDetails, setShowDetails] = useState<Boolean>(true);

  const rounding = showDetails ? "rounded-t-md" : "rounded-md";

  return (
    <div className="my-4" id={modelName}>
      <div
        className={`flex justify-between items-center border-2 p-3 ${rounding} cursor-pointer hover:bg-gray-100`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <h3 className="font-bold">{modelName}</h3>
        {showDetails ? (
          <ChevronUpIcon className={`h-6 w-6 text-black-500`} />
        ) : (
          <ChevronDownIcon className={`h-6 w-6 text-black-500`} />
        )}
      </div>
      {showDetails && <ModelDetails model={model} />}
    </div>
  );
}

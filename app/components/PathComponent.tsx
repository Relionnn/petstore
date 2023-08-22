import type { NewPath } from "~/interfaces/newPath.interface";
import { HttpMethod } from "~/interfaces/contract.interface";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import PathDetails from "./PathDetails";

function getThemeColorByMethod(method: string) {
  switch (method.toLowerCase()) {
    case HttpMethod.get:
      return "border-blue-500 bg-blue-100";
    case HttpMethod.post:
      return "border-green-500 bg-green-100";
    case HttpMethod.put:
      return "border-yellow-500 bg-yellow-100";
    case HttpMethod.delete:
      return "border-red-500 bg-red-100";
    default:
      return "border-gray-500 bg-gray-100";
  }
}

function getBackgroundColorByMethod(method: string) {
  switch (method.toLowerCase()) {
    case HttpMethod.get:
      return "bg-blue-500";
    case HttpMethod.post:
      return "bg-green-500";
    case HttpMethod.put:
      return "bg-yellow-500";
    case HttpMethod.delete:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

type PathDisplayProps = {
  path: NewPath;
};

export default function PathComponent({ path }: PathDisplayProps) {
  const [showDetails, setShowDetails] = useState<Boolean>(false);

  const themeColor = path.method
    ? getThemeColorByMethod(path.method)
    : "border-gray-500 bg-gray-100";
  const bgColor = path.method
    ? getBackgroundColorByMethod(path.method)
    : "bg-gray-500";

  const rounding = showDetails ? "rounded-t-md" : "rounded-md";

  return (
    <div className="my-4 shadow-md">
      <div
        className={`flex flex-wrap justify-between items-center ${themeColor} border-2 p-3 ${rounding} cursor-pointer`}
        onClick={() => setShowDetails(!showDetails)}
      >
        {path.method && (
          <h3
            className={`flex-none text-white font-bold w-20 text-center ${bgColor} mr-4 rounded`}
          >
            {path.method.toUpperCase()}
          </h3>
        )}

        <div className="flex-grow flex items-center space-x-4">
          {path.path && <h2 className="font-bold">{path.path}</h2>}
          {path.summary && <p className="hidden md:block">{path.summary}</p>}
        </div>
        {showDetails ? (
          <ChevronUpIcon className={`h-6 w-6 text-black-500`} />
        ) : (
          <ChevronDownIcon className={`h-6 w-6 text-black-500`} />
        )}
      </div>
      {showDetails && path && (
        <PathDetails path={path} themeColor={themeColor} />
      )}
    </div>
  );
}

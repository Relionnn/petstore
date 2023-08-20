import type { Path } from "~/interfaces/path.interface";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import PathDetails from "./PathDetails";

function getThemeColorByMethod(method: string) {
  switch (method.toLowerCase()) {
    case "get":
      return "border-blue-500 bg-blue-100";
    case "post":
      return "border-green-500 bg-green-100";
    case "put":
      return "border-yellow-500 bg-yellow-100";
    case "delete":
      return "border-red-500 bg-red-100";
    default:
      return "border-gray-500 bg-gray-100";
  }
}

function getBackgroundColorByMethod(method: string) {
  switch (method.toLowerCase()) {
    case "get":
      return "bg-blue-500";
    case "post":
      return "bg-green-500";
    case "put":
      return "bg-yellow-500";
    case "delete":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

type PathDisplayProps = {
  path: Path;
};

export default function PathComponent({ path }: PathDisplayProps) {
  const [showDetails, setShowDetails] = useState<Boolean>(false);

  const themeColor = getThemeColorByMethod(path.method);
  const bgColor = getBackgroundColorByMethod(path.method);

  const roundingClass = showDetails ? "rounded-t-md" : "rounded-md";

  return (
    <div className="my-4 shadow-md">
      <div
        className={`flex flex-wrap justify-between items-center ${themeColor} border-2 p-3 ${roundingClass} cursor-pointer`}
        onClick={() => setShowDetails(!showDetails)}
      >
        <h3
          className={`flex-none text-white font-bold w-20 text-center ${bgColor} mr-4 rounded`}
        >
          {path.method.toUpperCase()}
        </h3>

        <div className="flex-grow flex items-center space-x-4">
          <h2 className="font-bold">{path.path}</h2>
          <p className="hidden md:block">{path.summary}</p>
        </div>
        {showDetails ? (
          <ChevronUpIcon className={`h-6 w-6 text-black-500`} />
        ) : (
          <ChevronDownIcon className={`h-6 w-6 text-black-500`} />
        )}
      </div>
      {showDetails && <PathDetails path={path} themeColor={themeColor} />}
    </div>
  );
}

import type { Path } from "~/interfaces/path.interface";
import PathComponent from "./PathComponent";
import { useCallback, useEffect, useState } from "react";

type PathsDisplayProps = {
  paths: Path[];
};

export default function PathsDisplay({ paths }: PathsDisplayProps) {
  const [sortedPaths, setSortedPaths] = useState<Path[]>([]);

  const sortPaths = useCallback(
    (key: keyof Path) => {
      const sorted = [...paths].sort((a, b) =>
        a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
      );
      setSortedPaths(sorted);
    },
    [paths]
  );

  const sortOptions: { key: keyof Path; label: string }[] = [
    { key: "path", label: "Path" },
    { key: "tags", label: "Tag" },
    { key: "method", label: "Method" },
  ];

  useEffect(() => {
    sortPaths("path");
  }, [paths, sortPaths]);

  return (
    <div>
      <div className="flex flex-wrap items-center p-4 mt-4 border rounded shadow-md">
        <strong className="w-20">Sort by:</strong>
        {sortOptions.map((option) => (
          <button
            key={option.label}
            className="bg-white hover:bg-gray-100 font-semibold py-1 px-4 border border-gray-400 rounded shadow ml-2"
            onClick={() => sortPaths(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {sortedPaths?.map((path: Path) => (
        <PathComponent key={`${path.path}+${path.method}`} path={path} />
      ))}
    </div>
  );
}

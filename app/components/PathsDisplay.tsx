import type { NewPath } from "~/interfaces/newPath.interface";
import PathComponent from "./PathComponent";
import { useCallback, useEffect, useState } from "react";

type PathsDisplayProps = {
  paths: NewPath[];
};

export default function PathsDisplay({ paths }: PathsDisplayProps) {
  const [sortedPaths, setSortedPaths] = useState<NewPath[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const sortPaths = useCallback(
    (key: keyof NewPath) => {
      const sorted = [...paths].sort((a, b) =>
        a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
      );
      setSortedPaths(sorted);
    },
    [paths]
  );

  const filteredPaths = sortedPaths.filter((path) =>
    Object.values(path).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  const sortOptions: { key: keyof NewPath; label: string }[] = [
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
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="ml-auto border p-2 rounded" // style it as you want
        />
      </div>
      {filteredPaths?.map((path: NewPath) => (
        <PathComponent key={`${path.path}+${path.method}`} path={path} />
      ))}
    </div>
  );
}

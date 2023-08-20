import type { Path } from "~/interfaces/path.interface";
import PathComponent from "./PathComponent";
import { useEffect, useState } from "react";

type PathsDisplayProps = {
  paths: Path[];
};

export default function PathsDisplay({ paths }: PathsDisplayProps) {
  const [sortedPaths, setSortedPaths] = useState<Path[]>([]);

  const sortByPath = (paths: Path[]) => {
    const sortedByPath = paths.sort((a, b) =>
      a.path < b.path ? -1 : a.path > b.path ? 1 : 0
    );
    setSortedPaths(sortedByPath);
  };

  useEffect(() => {
    sortByPath(paths);
  }, [paths]);

  return (
    <div>
      {sortedPaths?.map((path: Path) => (
        <PathComponent key={`${path.path}+${path.method}`} path={path} />
      ))}
    </div>
  );
}

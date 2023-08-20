import type { Info } from "~/interfaces/api.interface";
import Markdown from "marked-react";

type InfoProps = {
  info: Info;
};

export default function InfoDisplay({ info }: InfoProps) {
  return (
    <div className="p-4 border rounded shadow-md">
      <div className="flex items-baseline mb-4">
        <h1 className="text-4xl font-bold">{info.title}</h1>
        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full ml-2">
          {info.version}
        </span>
      </div>

      <div className="mb-2 marked-content">
        <Markdown value={info.description} />
      </div>
      <div className="mb-2">
        <strong>Terms of Service:</strong>
        <a
          href={info.termsOfService}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          {info.termsOfService}
        </a>
      </div>
      <div className="mb-2">
        <strong>Contact:</strong>
        <a href={`mailto:${info.contact.email}`} className="text-blue-500">
          {info.contact.email}
        </a>
      </div>
      <div>
        <strong>License:</strong>
        <p>{info.license.name}</p>
        <p>
          <a
            href={info.license.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {info.license.url}
          </a>
        </p>
      </div>
    </div>
  );
}

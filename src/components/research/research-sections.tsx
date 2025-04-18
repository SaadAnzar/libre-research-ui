import ReactMarkdown from "@/components/react-markdown";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function SectionTitle({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className={cn(
          "w-full text-sm text-muted-foreground py-2 px-4 text-start hover:bg-accent",
          active && "text-sky-500"
        )}
      >
        {title}
      </button>
    </div>
  );
}

export function SectionContent({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <>
      <CardHeader className="py-4">
        <CardTitle className="text-xl text-sky-500">{title}</CardTitle>
      </CardHeader>
      <div className="text-muted-foreground text-sm px-6 overflow-auto md:h-[60vh]">
        <ReactMarkdown content={content} />
      </div>
    </>
  );
}

export function SourcesContent({
  sources,
}: {
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}) {
  return (
    <>
      <CardHeader className="py-4">
        <CardTitle className="text-xl text-sky-500">Sources</CardTitle>
      </CardHeader>
      <div className="text-accent-foreground/70 text-sm px-6 overflow-auto md:h-[60vh] space-y-3">
        {sources.map((source, index) => (
          <div key={index}>
            <p className="text-sm ">{source.title}</p>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs hover:underline"
            >
              {source.url}
            </a>
            <div className="text-muted-foreground text-xs pt-1">
              <ReactMarkdown content={source.snippet} />
            </div>
            {index !== sources.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </>
  );
}

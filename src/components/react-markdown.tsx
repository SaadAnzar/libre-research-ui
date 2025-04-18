"use client";

import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type MCtype = {
  content: string;
};

const ReactMarkdown = ({ content }: MCtype) => {
  return (
    <Markdown
      remarkPlugins={[[remarkGfm], [remarkMath]]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        h1: ({ node, children, ...props }) => (
          <h1 className="text-2xl font-bold mt-6 mb-4" {...props}>
            {children}
          </h1>
        ),
        h2: ({ node, children, ...props }) => (
          <h2 className="text-xl font-bold mt-5 mb-3" {...props}>
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3 className="text-lg font-bold mt-4 mb-2" {...props}>
            {children}
          </h3>
        ),
        p: ({ node, children, ...props }) => (
          <p className="mb-4 whitespace-pre-line" {...props}>
            {children}
          </p>
        ),
        ul: ({ node, children, ...props }) => (
          <ul className="list-disc pl-6 mb-4 space-y-2" {...props}>
            {children}
          </ul>
        ),
        ol: ({ node, children, ...props }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-2" {...props}>
            {children}
          </ol>
        ),
        li: ({ node, children, ...props }) => (
          <li className="mb-1" {...props}>
            {children}
          </li>
        ),
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              PreTag="div"
              language={match[1]}
              style={atomDark}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default ReactMarkdown;

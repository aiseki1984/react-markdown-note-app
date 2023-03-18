import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Element } from "hast";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeComponent = (props: {
  node: Element;
  inline?: boolean;
  className?: string;
  children: ReactNode;
}) => JSX.Element;

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter language={match[1]} style={tomorrow}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
};

export const MarkdownWithSyntaxHighlight = ({
  children,
}: {
  children: string;
}) => {
  return (
    <ReactMarkdown components={{ code: CodeBlock }}>{children}</ReactMarkdown>
  );
};

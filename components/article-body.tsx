import React from "react";

function inline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseRow(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

/** Renderer markdown ringan: heading, list, blockquote, tabel, paragraf. */
export function ArticleBody({ body }: { body: string }) {
  const lines = body.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let table: string[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul key={`ul-${key++}`}>
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  const flushTable = () => {
    if (table.length === 0) return;
    const rows = table.map(parseRow).filter((r) => !r.every((c) => /^-{2,}$/.test(c) || c === ""));
    const [head, ...rest] = rows;
    blocks.push(
      <div key={`tbl-${key++}`} className="my-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-cream/70">
              {head?.map((c, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft"
                >
                  {inline(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rest.map((row, ri) => (
              <tr key={ri} className="border-t border-line/70">
                {row.map((c, ci) => (
                  <td key={ci} className="px-4 py-2.5 text-ink-soft">
                    {inline(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    table = [];
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("|")) {
      table.push(line);
      continue;
    }
    flushTable();

    if (line === "") {
      flushList();
      continue;
    }

    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      continue;
    }

    flushList();

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={`h3-${key++}`}>{inline(line.slice(4))}</h3>);
    } else if (line.startsWith("## ")) {
      blocks.push(<h2 key={`h2-${key++}`}>{inline(line.slice(3))}</h2>);
    } else if (line.startsWith("> ")) {
      blocks.push(<blockquote key={`q-${key++}`}>{inline(line.slice(2))}</blockquote>);
    } else {
      blocks.push(<p key={`p-${key++}`}>{inline(line)}</p>);
    }
  }

  flushList();
  flushTable();

  return <div className="prose-mice">{blocks}</div>;
}

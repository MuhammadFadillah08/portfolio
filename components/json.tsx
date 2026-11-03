import type { CSSProperties, ReactNode } from "react";

const TOKEN = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)|([{}[\],])/g;

function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(line.slice(last, i));
    if (m[1]) {
      out.push(
        <span key={i} className={m[2] ? "tok-key" : "tok-str"}>
          {m[1]}
        </span>,
      );
      if (m[2]) out.push(<span key={`${i}:`} className="tok-punc">{m[2]}</span>);
    } else if (m[3]) {
      out.push(<span key={i} className="tok-bool">{m[3]}</span>);
    } else if (m[4]) {
      out.push(<span key={i} className="tok-num">{m[4]}</span>);
    } else {
      out.push(<span key={i} className="tok-punc">{m[5]}</span>);
    }
    last = i + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

// JSON berwarna; tiap baris muncul bergantian.
export function Json({ value, step = 30 }: { value: unknown; step?: number }) {
  const lines = JSON.stringify(value, null, 2).split("\n");
  return (
    <pre className="font-mono text-[12.5px] leading-[1.7] text-code-text">
      <code>
        {lines.map((l, i) => (
          <div key={i} className="code-line whitespace-pre" style={{ "--i": `${i * step}ms` } as CSSProperties}>
            {highlight(l)}
          </div>
        ))}
      </code>
    </pre>
  );
}

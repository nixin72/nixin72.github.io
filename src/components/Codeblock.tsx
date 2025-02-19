import SyntaxHighlighter from 'react-syntax-highlighter';

type CodeblockArgs = {
  code: string;
  language: string;
}

export default function Codeblock({code, language }: CodeblockArgs) {
  const circle = { width: "1rem", height: "1rem", borderRadius: "500px"}
  return (
    <div>
      <div style={{
        borderRadius: "5px 5px 0 0",
        borderBottom: "thin solid black",
        display: 'flex',
        padding: "0.5rem",
        backgroundColor: "rgb(200, 200, 200)"
      }}>
        <div style={{...circle, backgroundColor: "red", marginRight: 10}}></div>
        <div style={{...circle, backgroundColor: "yellow", marginRight: 10}}></div>
        <div style={{...circle, backgroundColor: "green"}}></div>
      </div>
      { /** @ts-ignore */}
      <SyntaxHighlighter
        language={language}
        customStyle={{ borderRadius: "0 0 5px 5px", marginTop: 0 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
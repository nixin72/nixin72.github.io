import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeblockArgs = {
  code: string;
  language: string;
  lineNumbers?: boolean;
}

export function Codeblock({code, language, lineNumbers}: CodeblockArgs) {
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
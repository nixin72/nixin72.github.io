import React from 'react';
import Markdown from 'react-markdown';

export type MdMetadata = {
  title: string;
  date: string;
  time: string;
}

export function useMd(src: string): { metadata: MdMetadata, post: String } {
  console.log("USEMD", src)
  const [metadata, setMetadata] = React.useState({});
  const [post, setPost] = React.useState("");

  React.useEffect(() => {
    fetch(src).then(res => res.text()).then(text => {
      let full = text.trim();

      while (full.includes("#+META:")) {
        const metaline = full.substring(0, full.indexOf("\n"));
        const [ k, v ] = metaline.substring(0, 6).split(" ", 1);
        setMetadata({...metadata, [k]: v});
        full = full.substring(full.indexOf("\n"));
        console.log(full);
      }

      setPost(full);

    });
  }, [src, metadata]);

  return {
    // @ts-ignore
    metadata, post
  }
}

type MdProps = {
  src: string;
  lines?: number;
  chars?: number;
}

export default function Md({ src, lines, chars }: MdProps) {
  const [md, setMd] = React.useState("");

  React.useEffect(() => {
    fetch(src).then(res => res.text()).then(text => {
      if (lines) {
        setMd(text.split("\n").slice(0, lines).join("\n"));
      }
      else if (chars) {
        setMd(text.substring(0, chars) + "...");
      }
      else {
        setMd(text);
      }
    });
  }, [src, chars, lines])

  return (
    <Markdown>{md}</Markdown>
  )
}
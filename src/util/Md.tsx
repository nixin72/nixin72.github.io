import React from 'react';
import Markdown from 'react-markdown';
import Codeblock from '../components/Codeblock';

export type MdMetadata = {
  title?: string;
  date?: string;
  time?: string;
}

export function useMd(src: string): { metadata: MdMetadata, post: string } {
  const [metadata, setMetadata] = React.useState({} as MdMetadata);
  const [post, setPost] = React.useState("");

  React.useEffect(() => {
    fetch(src).then(res => res.text()).then(text => {
      let full = text.trim();
      const metaBlockRe = /^---([\s\S]*?)---/;
      const metadataStr = text.match(metaBlockRe)?.[1];

      if (!metadataStr) {
        setMetadata({});
        setPost(full as string);
      }
      else {
        const meta = metadataStr?.trim().split("\n").reduce((a, metaline) => {
          const [ k, v ] = metaline.split(/:\s/);
          return { ...a, [k]: v };
        }, {}) as object;
        setMetadata(meta);
        setPost(full.substring((metadataStr?.length ?? 0) + 8) as string)
      }
    });
  }, [src]);

  return { metadata, post }
}

type MdProps = {
  src: string;
  lines?: number;
  chars?: number;
}

export default function Md({ src, lines, chars }: MdProps) {
  const [md, setMd] = React.useState("");
  const { post } = useMd(src);

  React.useEffect(() => {
    if (lines) {
      setMd(post.split("\n").slice(0, lines).join("\n"));
    }
    else if (chars) {
      setMd(post.substring(0, chars) + "...");
    }
    else {
      setMd(post + "");
    }
  }, [post, chars, lines])

  return (
    <Markdown>{md}</Markdown>
  )
}
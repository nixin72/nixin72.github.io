import React from 'react';
import Markdown from 'react-markdown';

type MdProps = {
  src: string;
}

export default function Md({ src }: MdProps) {
  const [md, setMd] = React.useState("");

  React.useEffect(() => {
    fetch(src).then(res => res.text()).then(text => setMd(text));
  }, [])

  return (
    <Markdown>{md}</Markdown>
  )
}
import { useMotionValue } from "motion/react";

import Md, { useMd } from "../util/Md";
import Header from "../components/Header";
import { useParams } from "react-router";
import Markdown from "react-markdown";

type PostProps = {
  src: string;
}

function urlToMdsrc(src: string) {
  return `/md/${src}.md`;
}

function Post({ src }: PostProps) {
  const { metadata, post } = useMd(urlToMdsrc(src));
  console.log(metadata, post);

  return (
    <div>
      <h4><a href={`${src}`}>{metadata.title}</a></h4>
      <h5>{metadata.date} | {metadata.time}min read</h5>
      <hr />
      <Markdown>{post.substring(0, 250)}</Markdown>
    </div>
  );
}

export default function Blog() {
  const { post } = useParams();
  const opacity = useMotionValue(1);

  return (
    <div className="fc aic" style={{ textAlign: 'left' }}>
      <Header opacity={opacity} />
      <div style={{ marginTop: '8vh', width: "50%" }}>
        {post ? <Md src={urlToMdsrc(post)} /> :
        <>
          <Md src="/md/blog.md" />
          <Post src="blog/shell-vs-repl" />
        </>
        }
      </div>
    </div>
  );
}
import Markdown from "react-markdown";
import { useParams } from "react-router";
import { useMotionValue } from "motion/react";

import Md, { useMd } from "../util/Md";
import Header from "../components/Header";
import Codeblock from "../components/Codeblock";
import { useContentWidth } from "../util/Util";

type PostProps = {
  src: string;
}

function urlToMdsrc(src: string) {
  if (process.env.NODE_ENV === "development") {
    return `/md/${src}.md`;
  }
  else {
    return `https://raw.githubusercontent.com/nixin72/nixin72.github.io/refs/heads/master/docs/md/${src}.md`
  }
}

function PostSummary({ src }: PostProps) {
  const url = urlToMdsrc(src);
  const { metadata, post } = useMd(url);

  return (
    <div>
      <h4><a href={`/#/${src}`}>{metadata.title}</a></h4>
      <h5>{metadata.date} | {metadata.time}min read</h5>
      <Markdown>{post.substring(0, 250) + "..."}</Markdown>
    </div>
  );
}

function Post({ src }: PostProps) {
  const url = urlToMdsrc(src);
  const { metadata, post } = useMd(url);

  return (
    <div>
      <center>
        <h4>{metadata.title}</h4>
        <h5>{metadata.date} &nbsp;&nbsp;|&nbsp;&nbsp; {metadata.time}min read</h5>
      </center>
      <div className="md">
        <Markdown components={{
          code(props) {
            const { className, children } = props;
            if (className) {
              return <Codeblock language={className as string} code={children as string} />
            }
            else {
              return <code>{children}</code>
            }
          }
        }}>{post}</Markdown>
      </div>
    </div>
  );
}

export default function Blog() {
  const { post } = useParams();
  const opacity = useMotionValue(1);
  const { narrow } = useContentWidth();

  return (
    <div className="fc aic" style={{ textAlign: 'left' }}>
      <Header opacity={opacity} />
      <div style={{ marginTop: '8vh', width: narrow }}>
        {post ?
        <>
          <Post src={`blog/${post}`} />
        </> :
        <>
          <h2>Blog</h2>
          <Md src="/md/blog.md" />
          <hr />
          <PostSummary src="blog/shell-vs-repl" />
        </>
        }
      </div>
    </div>
  );
}
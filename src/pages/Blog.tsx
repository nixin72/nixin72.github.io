import { useMotionValue } from "motion/react";

import Md, { useMd } from "../util/Md";
import Header from "../components/Header";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import Codeblock from "../components/Codeblock";

type PostProps = {
  src: string;
}

function urlToMdsrc(src: string) {
  return `/md/${src}.md`;
}

function PostSummary({ src }: PostProps) {
  const url = urlToMdsrc(src);
  const { metadata, post } = useMd(url);

  return (
    <div>
      <h4><a href={`${src}`}>{metadata.title}</a></h4>
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

  return (
    <div className="fc aic" style={{ textAlign: 'left' }}>
      <Header />
      <div style={{ marginTop: '8vh', width: "50%" }}>
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
import Link from "next/link";
import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import MarkdownField from "@/components/MarkdownField";
import styles from "./post.module.css";
import { Fragment } from "react";

export const generateStaticParams = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => {
    slug;
  });
  console.log(`paths:${paths}`);
  return paths;
};

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
};

const renderBlock = (block: PartialBlockObjectResponse) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return <ul>{value.children.map((child) => renderBlock(child))}</ul>;
    }
    case "numbered_list": {
      return <ol>{value.children.map((child) => renderBlock(child))}</ol>;
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {block.children?.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{value.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case "code":
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <a href={href} target="_brank" className={styles.bookmark}>
          {href}
        </a>
      );
    case "table": {
      return (
        <table className={styles.table}>
          <tbody>
            {block.children?.map((child, i) => {
              const RowElement =
                value.has_column_header && i == 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell, i) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        <Text text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className={styles.row}>
          {block.children.map((block) => renderBlock(block))}
        </div>
      );
    }
    case "column": {
      return <div>{block.children.map((child) => renderBlock(child))}</div>;
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

// export default function Post({ page, blocks }) {
//   if (!page || !blocks) {
//     return <div />;
//   }
//   return (
//     <div>
//       <Head>
//         <title>{page.properties.Name.title[0].plain_text}</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <article className={styles.container}>
//         <h1 className={styles.name}>
//           <Text text={page.properties.Name.title} />
//         </h1>
//         <section>
// {blocks.map((block) => (
//   <Fragment key={block.id}>{renderBlock(block)}</Fragment>
// ))}
//           <Link href="/" className={styles.back}>
//             ← Go home
//           </Link>
//         </section>
//       </article>
//     </div>
//   );
// }

// const Post = async ({ params }: { params: { slug: string } }) => {
//   const post = await getSinglePost(params.slug);
//   // const page = await getPage(post.metadata.id);
//   const blocks = await getBlocks(post.metadata.id);
//   return (
//     <section className="container lg:px-2 px-5 lg:w-3/5 mx-auto mt-20">
//       <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
//       <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
//       <span className="text-gray-500">Posted date at {post.metadata.date}</span>
//       <br />
//       {post.metadata.tags.map((tag: string, index: number) => (
//         <p
//           key={index}
//           className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
//         >
//           <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
//         </p>
//       ))}

//       <div className="mt-10 font-medium">
//         <article className={styles.container}>
//           <h1 className={styles.name}>
//             <Text text={post.metadata.title} />
//           </h1>
//           <section>
//             {blocks.map((block) => (
//               <Fragment key={block.id}>{renderBlock(block)}</Fragment>
//             ))}
//             <Link href="/" className={styles.back}>
//               ← Go home
//             </Link>
//           </section>
//         </article>
//       </div>

//       <div className="mt-10 font-medium">
//         <Link href="/">
//           <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
//         </Link>
//       </div>
//     </section>
//   );
// };

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await getSinglePost(params.slug);
  const blocks = post.markdown;
  return (
    <section className="container lg:px-2 px-5 lg:w-3/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string, index: number) => (
        <p
          key={index}
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
        >
          <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
        </p>
      ))}

      <div className="mt-10 font-medium">
        {/* <MarkdownField post={post} /> */}
        {blocks.map((block, index) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </div>

      <div className="mt-10 font-medium">
        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;

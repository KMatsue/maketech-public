import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="App" />
      </Head>
      <body className="dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import { FC } from 'react';

const Document: FC = () => {
  return (
    <Html lang="ja">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

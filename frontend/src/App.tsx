import React from "react";
import { Layout } from "antd";
import styles from "./index.module.sass";
import "antd/dist/antd.css";
import { ContentContainer } from "./containers/content-container";
import { Header } from "./components/header";
import { ErrorBoundary } from "./components/error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <Layout className={styles.layout}>
        <Header />
        <Layout.Content className={styles.contentWrapper}>
          <ContentContainer />
        </Layout.Content>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";
import styles from "./index.module.sass";
import logo from "../../images/books.png";

export const Header: React.FC = () => (
  <Layout.Header className={styles.header}>
    <Link to={`/`}>
      {" "}
      <img src={logo} className={styles.logo} alt="logo"></img>
    </Link>{" "}
    <Typography.Title level={3} className={styles.logoText}>
      Library app
    </Typography.Title>
    <div className={styles.teamName}>
      {" "}
      Made by laugh-most-late-coat-not-deterministic
    </div>
  </Layout.Header>
);

'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { Row, Layout as AntdLayout, Col, Menu } from "antd";
import Link from "next/link";
import { auth } from "@/infrastructure/firebase";
import { useState } from "react";
import { User } from "firebase/auth";
import { BookOutlined, LineChartOutlined, LoginOutlined, LogoutOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>();
  auth.onAuthStateChanged((u) => {
    setUser(u);
  });

  return (
    <html lang="en">
      <head>
        <title>SMW tools</title>
      </head>
      <body className={inter.className}>
      <AntdLayout>
        <AntdLayout.Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <Row align="bottom">
              <Col span={24}>
                <Link href="/">
                  {/* <img width="100%" src={logo} alt="logo" /> */}
                  SMW tools
                </Link>
                {/* <div><span style={{ color: 'white'}}>{version}</span></div> */}
              </Col>
            </Row>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {user ? (
              <>
                <Menu.Item key="track" icon={<LineChartOutlined />}>
                  <Link href="/track">Track</Link>
                </Menu.Item>
                <Menu.SubMenu key="data" icon={<BookOutlined />} title="Data">
                  <Menu.Item key="data:monster">
                    <Link href="/data/monster">Monster</Link>
                  </Menu.Item>
                </Menu.SubMenu>
              </>
            ): (
              <Menu.Item key="login" icon={<LoginOutlined/>}>
                <Link href="login">Login</Link>
              </Menu.Item>
            )}
          </Menu>
        </AntdLayout.Sider>
        <AntdLayout>
          <AntdLayout.Content style={{ padding: 32, overflow: 'auto' }}>
            {children}
          </AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
      </body>
    </html>
  );
}

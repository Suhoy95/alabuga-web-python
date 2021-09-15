import React from "react"
import { Link, withRouter } from "react-router-dom"

import { Layout, Menu, } from "antd"
import {
    BankOutlined,
    AppstoreOutlined,
    DownloadOutlined,
    ExportOutlined
} from '@ant-design/icons';

const { Header } = Layout;

const WhHeader = withRouter(({ location }) => {
    const iconSize = '24px';
    return (
        <Header>
            <Menu theme="dark" mode="horizontal"
                defaultSelectedKeys={['/']}
                selectedKeys={[location.pathname]}>
                <Menu.Item key="/">
                    <BankOutlined style={{ fontSize: iconSize }} />
                    <span>Склад РиК</span>
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="/resources">
                    <AppstoreOutlined style={{ fontSize: iconSize }} />
                    <span>Товары</span>
                    <Link to="/resources" />
                </Menu.Item>
                <Menu.Item key="/supply">
                    <DownloadOutlined style={{ fontSize: iconSize }} />
                    <span>Завести товар</span>
                    <Link to="/supply" />
                </Menu.Item>
                <Menu.Item key="/ship">
                    <ExportOutlined style={{ fontSize: iconSize }} />
                    <span>Отгрузить товар</span>
                    <Link to="/ship" />
                </Menu.Item>
            </Menu>
        </Header>
    );
});

export default WhHeader;

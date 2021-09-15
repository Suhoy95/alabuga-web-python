import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route } from "react-router-dom"

import "antd/dist/antd.css"
import { Layout } from "antd"

import WhHeader from "./WhHeader"

const { Content, Footer } = Layout;

const MainView = () => (<h1>Total cost</h1>)
const ResourcesView = () => (<h1>Resources</h1>)


ReactDOM.render(
    <Router>
        <Layout>
            <WhHeader />
            <Content>
                <Route exact path="/" component={MainView} />
                <Route path="/resources" component={ResourcesView} />
            </Content>
            <Footer>
                Сделал <a href="https://gramend.ru/cv/" target="_blank" rel="noopener noreferrer">Сухоплюев Илья</a> для <a href="https://izhevsk.hh.ru/employer/68587" target="_blank" rel="noopener noreferrer">Алабуги</a>.
            </Footer>
        </Layout>
    </Router>,
    document.getElementById("container")
)

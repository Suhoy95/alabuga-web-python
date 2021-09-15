import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route } from "react-router-dom"

import "antd/dist/antd.css"
import { Layout } from "antd"
const { Content, Footer } = Layout;

import WhHeader from "./WhHeader"
import TotalCostView from "./TotalCostView"
import ResourcesView from "./ResourcesView"

ReactDOM.render(
  <Router>
    <Layout>
      <WhHeader />
      <Content style={{ padding: ' 0 50px' }}>
        <Route exact path="/" component={TotalCostView} />
        <Route path="/resources" component={ResourcesView} />
      </Content>
      <Footer>
        Сделал <a href="https://gramend.ru/cv/" target="_blank" rel="noopener noreferrer">Сухоплюев Илья</a> для <a href="https://izhevsk.hh.ru/employer/68587" target="_blank" rel="noopener noreferrer">Алабуги</a>.
      </Footer>
    </Layout>
  </Router>,
  document.getElementById("container")
)

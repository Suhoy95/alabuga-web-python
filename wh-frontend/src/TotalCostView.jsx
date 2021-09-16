import React from "react"

import { PageHeader, Divider, Table } from "antd"
import reqwest from "reqwest"

const columns = [
  {
    title: "Название товара",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Общая стоимость",
    dataIndex: "total",
    key: "total",
  }
]

class TotalCostView extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      total: 0,
      resources: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    reqwest({
      url: '/total-cost/',
      method: 'get',
      type: 'json',
    }).then(data => {
      this.setState({ loading: false })
      this.setState(data)
    }).fail((err, msg) => {
      if (err.status == 401 || err.status == 403) {
        window.location.replace(`/api-auth/login/?next=${encodeURI(window.location.pathname)}`)
      }
      console.log(err, msg);
    });
  }

  render() {
    const { total, resources, loading } = this.state;
    return (
      <>
        <PageHeader
          title="Общая стоимость товаров:"
          subTitle={total}
        />
        <Divider />
        <Table
          dataSource={resources}
          rowKey={resource => resource.id}
          columns={columns}
          pagination={false}
          loading={loading}
        />
      </>
    );
  }
}

export default TotalCostView;

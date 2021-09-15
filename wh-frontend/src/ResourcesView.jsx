import React from "react"

import { PageHeader, Divider, Table, Space, Button } from "antd"
import {
  DeleteOutlined,
} from '@ant-design/icons';
import reqwest from "reqwest"

import CreateResourceModal from "./CreateResourceModal"
import EditResourceModal from "./EditResourceModal";
import XCSRFHeaders from "./reqwest-headers";

const DeleteButton = ({ id, onDelete }) => {

  const onClick = () => {
    reqwest({
      url: `/resources/${id}/`,
      method: 'delete',
      headers: XCSRFHeaders(),
    }).then(() => {
      onDelete();
    })
  };

  return (
    <Button onClick={onClick}><DeleteOutlined /></Button>
  );
};

class ResourcesView extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      results: [],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
      }
    }

    this.refresh = this.refresh.bind(this);

    this.columns = [
      {
        title: "Название товара",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Количество",
        dataIndex: "quantity",
        key: "quantity",
        align: "center",
        render: (q, res) => `${q} ${res.measure_unit}`,
      },
      {
        title: "Цена",
        dataIndex: "cost",
        key: "cost",
        align: "center",
      },
      {
        title: "Общая стоимость",
        key: "total",
        render: (resource) => resource.cost * resource.quantity,
        align: "center",
      },
      {
        title: "Дата последней Поставки/Отгрузки",
        dataIndex: "last_update",
        key: "last_update",
        align: "center",
        render: (dateString) => (new Date(dateString)).toLocaleString(),
      },
      {
        title: "",
        key: "actions",
        align: "center",
        render: (res) => (<Space>
          <EditResourceModal resource={res} onEdit={this.refresh} />
          <DeleteButton id={res.id} onDelete={this.refresh} />
        </Space>),
      }
    ];
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({ pagination });
  };

  fetch(params = { pagination: {} }) {
    this.setState({ loading: true });
    reqwest({
      url: '/resources/',
      method: 'get',
      type: 'json',
      data: {
        offset: (params.pagination.current - 1) * params.pagination.pageSize,
        limit: params.pagination.pageSize,
      }
    }).then(data => {
      this.setState({
        loading: false,
        results: data.results,
        pagination: {
          ...params.pagination,
          total: data.count,
        }
      })
    })
  }

  refresh() {
    this.fetch({ pagination: this.state.pagination });
  }

  render() {
    const { results, pagination, loading } = this.state;
    return (
      <>
        <PageHeader
          title="Товары на складе"
          subTitle={`Всего товаров: ${pagination.total}`}
        />
        <Divider />
        <CreateResourceModal onCreate={this.refresh} />
        <Divider />
        <Table
          dataSource={results}
          rowKey={resource => resource.id}
          columns={this.columns}
          loading={loading}
          pagination={pagination}
          onChange={this.handleTableChange}
        />
      </>
    );
  }
}

export default ResourcesView;

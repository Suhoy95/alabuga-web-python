import React from "react"

import { PageHeader, Divider, Table } from "antd"
import reqwest from "reqwest"

import CreateResourceModal from "./CreateResourceModal"

const columns = [
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
]

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
    }

    componentDidMount() {
        const {pagination} = this.state;
        this.fetch({pagination});
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({pagination});
      };

    fetch(params = {pagination: {}}) {
        this.setState({loading: true});
        reqwest({
            url: 'http://localhost:8000/resources/',
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

    render() {
        const {results, pagination, loading } = this.state;
        return (
            <>
                <PageHeader
                    title="Товары на складе"
                    subTitle={`Всего товаров: ${pagination.total}`}
                />
                <Divider />
                <CreateResourceModal onCreate={() => this.fetch({pagination:pagination})}/>
                <Divider />
                <Table
                    dataSource={results}
                    rowKey={resource => resource.id}
                    columns={columns}
                    loading={loading}
                    pagination={pagination}
                    onChange={this.handleTableChange}
                />
            </>
        );
    }
}

export default ResourcesView;
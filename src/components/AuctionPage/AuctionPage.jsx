import React, { Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import web3hoc from '../../hoc/web3hoc';
import { Link } from 'react-router-dom';
import reqwest from 'reqwest';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const getRandomuserParams = params => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class AuctionPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      token: {
        name: '',
        proofs: [],
        quality: '',
        rank: '',
        price: ''
      },
      // dataSource: [
      //   {
      //     "address": "11fc751fc0cd1ca707f484516a34a3f52bb40afbbfdd96b7a5669273074f791a",
      //     "photo": "Img",
      //     "soulprint": "Chan",
      //     "epic": [
      //       "blogger",
      //       "unicorn"
      //     ],
      //     "proofs": [
      //       "facebook-f",
      //       "telegram",
      //       "instagram",
      //       "google",
      //       "ethereum"
      //     ],
      //     "price": "1.4543",
      //   }
      // ],
      // columns: [
      //   {
      //     title: 'Photo',
      //     dataIndex: 'photo',
      //     key: 'photo',
      //   },
      //   {
      //     title: 'Address',
      //     dataIndex: 'address',
      //     key: 'address',
      //     filters: [
      //       {
      //         text: 'Joe',
      //         value: 'Joe',
      //       },
      //       {
      //         text: 'Jim',
      //         value: 'Jim',
      //       },
      //       {
      //         text: 'Submenu',
      //         value: 'Submenu',
      //         children: [
      //           {
      //             text: 'Green',
      //             value: 'Green',
      //           },
      //           {
      //             text: 'Black',
      //             value: 'Black',
      //           },
      //         ],
      //       },
      //     ],
      //     // specify the condition of filtering result
      //     // here is that finding the name started with `value`
      //     onFilter: (value, record) => record.name.indexOf(value) === 0,
      //     sorter: (a, b) => a.name.length - b.name.length,
      //     sortDirections: ['descend'],
      //   },
      //   {
      //     title: 'Soulprint',
      //     dataIndex: 'soulprint',
      //     key: 'soulprint',
      //     defaultSortOrder: 'descend',
      //     sorter: (a, b) => a.age - b.age,
      //   },
      //   {
      //     title: 'Epic',
      //     key: 'epic',
      //     dataIndex: 'epic',
      //     render: proofs => (
      //       <>
      //         {proofs.map(tag => {
      //           let color = tag.length > 5 ? 'geekblue' : 'green';
      //           if (tag === 'loser') {
      //             color = 'volcano';
      //           }
      //           return (
      //             <Tag color={color} key={tag}>
      //               {tag.toUpperCase()}
      //             </Tag>
      //           );
      //         })}
      //       </>
      //     ),
      //   },
      //   {
      //     title: 'Proofs',
      //     key: 'proofs',
      //     dataIndex: 'proofs',
      //     render: proofs => (
      //       <ProofsList soulProofs={proofs} />
      //     ),
      //   },
      //   {
      //     title: 'Price',
      //     dataIndex: 'price',
      //     key: 'price',
      //     filters: [
      //       {
      //         text: 'London',
      //         value: 'London',
      //       },
      //       {
      //         text: 'New York',
      //         value: 'New York',
      //       },
      //     ],
      //     filterMultiple: false,
      //     onFilter: (value, record) => record.address.indexOf(value) === 0,
      //     sorter: (a, b) => a.address.length - b.address.length,
      //     sortDirections: ['descend', 'ascend'],
      //   },
      //   {
      //     title: 'Action',
      //     key: 'action',
      //     render: (text, record) => (
      //       <Space size="middle">
      //         <a>Buy</a>
      //         <a>Hide</a>
      //       </Space>
      //     ),
      //   },
      // ],
      data: [],
      columns: [
        {
          title: 'Id',
          dataIndex: 'soulId',
          key: 'soulId',
          // width: 150,
        },
        {
          title: 'Carrier',
          dataIndex: 'carrier',
          key: 'carrier',
          // width: 150,
          render: text => <Link to={'/soul/' + text}>{text.substring(0, 20)}...</Link>
        },
        {
          title: 'Owner',
          dataIndex: 'owner',
          key: 'owner',
          render: text => <Link to={'/soul/' + text}>{text.substring(0, 20)}...</Link>

        },
        {
          title: 'Epic',
          dataIndex: 'donorMods',
          key: 'donorMods',
        },
        {
          title: 'Mods',
          dataIndex: 'soulMods',
          key: 'soulMods',
        },
        {
          title: 'Price',
          dataIndex: 'marketPrice',
          key: 'marketPrice',
        }
      ],
      pagination: {
        current: 1,
        pageSize: 25,
      },
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.state.web3connected === "true") {
      this.props.getAllSouls()
    }
  }

  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      console.log(data);
      this.setState({
        loading: false,
        data: data.results,
        pagination: {
          ...params.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };

  render() {

    const { souls } = this.props.state;
    const { pagination, loading } = this.state;

    console.log("AP souls: ", souls);

    let uniq = souls.filter(function (item, pos) {
      return souls.indexOf(item) === pos;
    });


    let change;

    for (var i in souls) {
      souls[i].marketPrice = souls[i].marketInfo.price;
    }

    console.log("new souls: ", souls)

    return (
      <Table
        dataSource={souls}
        columns={this.state.columns}
        // rowKey={record => record.soulId}
        pagination={pagination}
        loading={loading}
        // scroll={{ y: 240 }}
        onChange={onChange}
      />
    );
  }
}

export default web3hoc(AuctionPage);

import { Button, Card, Col, Row, Space, Table, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { addorderAPI, Editorder, orderAPI } from "../Api/order/Order";
import { Excel } from "antd-table-saveas-excel";
import Title from "antd/es/typography/Title";
import { Select } from "antd";
import moment from "moment";
import { Toast } from "bootstrap";
const Home = () => {
  const [order, setOrder] = useState([]);
  const columns = [
    {
      title: "Họ tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },

    {
      title: "Ngày tạo tài khoản",
      dataIndex: "byDate",
      key: "byDate",
      render: (byDate) => <div>{moment(byDate).format("MMMM Do YYYY")}</div>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Trạng thái đơn hàng",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Chi tiết đơn hàng",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle" onClick={() => OrderId(record)}>
            <p>Xem Chi tiết</p>
          </Space>
        </>
      ),
    },

    {
      title: "Chốt đơn hàng",
      key: "status",
      render: (item, record) => (
        <>
          <Select
            defaultValue={item.status}
            style={{ width: 120 }}
            onChange={(e) => handleChangeSelect(e, item)}
            options={[
              { value: "placed", label: "placed" },
              { value: "delivered", label: "delivered" },
              { value: "canceled", label: "canceled" },
            ]}
          ></Select>
        </>
      ),
    },
  ];

  const handleChangeSelect = async (values, item) => {
    console.log("item", item, values);
    try {
      const res = await Editorder(item._id, values);
      getOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const [dataOrder, setdataOrder] = useState([]);
  const OrderId = async (record) => {
    setEdit(true);
    try {
      const res = await addorderAPI(record._id);
      setdataOrder(res.order);
    } catch (error) {
      console.log(error);
    }
  };
  const column = [
    {
      title: "Họ tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Ngày mua",
      dataIndex: "byDate",
      key: "byDate",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
  ];
  const [edit, setEdit] = useState(false);

  const getOrder = async () => {
    try {
      const res = await orderAPI();
      const a = res.result.orders;
      setOrder(a);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div>
      <Row gutter={[24, 12]}>
        <Title level={2}>Danh sách đơn hàng người dùng đã đặt hàng</Title>
        <Col xs={24} md={24}>
          <Button
            style={{
              marginBottom: 20,
            }}
            type="primary"
            onClick={() => {
              const excel = new Excel();
              excel
                .addSheet("test")
                .addColumns(column)
                .addDataSource(order)
                .saveAs("Đơn_đặt_hàng.xlsx");
            }}
          >
            Xuất Excel
          </Button>
          <Card>
            <Table columns={columns} dataSource={order} />;
          </Card>
        </Col>
        <Modal
          title="Chi tiết đơn hàng"
          open={edit}
          onCancel={() => setEdit(false)}
          onOk={() => setEdit(false)}
        >
          <Row>
            <Col span={24}>Tên người đặt hàng :{dataOrder?.customerName}</Col>
            <Col span={24}>địa chỉ người nhận :{dataOrder?.address}</Col>
            <Col span={24}>Mã code sản phẩm :{dataOrder?.code}</Col>
            <Col span={24}>
              Tên tài khoản người dùng:{dataOrder?.customerId?.username}
            </Col>
            <Col span={24}>
              Số điện thoại mua hàng :{dataOrder?.phoneNumber}
            </Col>
            <Col span={24}>email đăng kí :{dataOrder?.customerId?.email}</Col>
            <Col span={24}>
              số điện thoại đăng kí tài khoản :
              {dataOrder?.customerId?.phoneNumber}
            </Col>
            <Col span={24}>
              danh sách các loại sản phẩm mua hàng:
              {dataOrder?.details?.map((i) => (
                <Col span={24}>-{i?.product?.name}</Col>
              ))}
            </Col>

            <Col span={24}>
              Tổng số tiền:
              <a style={{ color: "red" }}>
                {dataOrder?.total?.toLocaleString()}đ
              </a>
            </Col>
          </Row>
        </Modal>
      </Row>
    </div>
  );
};

export default Home;

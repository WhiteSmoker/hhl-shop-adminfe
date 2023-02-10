import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Row,
  Table,
  Space,
  Input,
  Button,
  Typography,
  message,
  Form,
  Modal,
} from "antd";
import { Excel } from "antd-table-saveas-excel";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

import {
  addUserApi,
  DeleteUserAPI,
  GetUserApi,
  putUserApi,
} from "../Api/auth/LoginAPi";

const Tables = () => {
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày tạo tài khoản",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <div>{moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <EditOutlined onClick={() => Editdata(record)} />
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => DeleteUser(record)}
            />
          </Space>
        </>
      ),
    },
  ];
  const columns1 = [
    {
      title: "Tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày tạo tài khoản",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <div>{moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}</div>
      ),
    },
  ];
  const [a, seta] = useState([]);
  const [edit, setEdit] = useState(false);
  const { Title } = Typography;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetUser = async () => {
    try {
      const res = await GetUserApi();
      setData(res.result.users.filter((i) => i.role === 0));
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const res = await addUserApi(
        values.username,
        values.email,
        values.password,
        values.phoneNumber
      );
      setLoading(false);
      GetUser();
      message.success("bạn đã thêm thành công");
    } catch (error) {
      message.warning(error.message);
      setLoading(false);
    }
  };
  const DeleteUser = async (record) => {
    try {
      const res = await DeleteUserAPI(record._id);
      message.success("bạn đã xóa thành công");
      GetUser();
    } catch (error) {
      message.warning(error.message);
    }
  };
  const Editdata = async (record) => {
    setEdit(true);
    seta(record);
  };
  useEffect(() => {
    GetUser();
  }, []);
  return (
    <div>
      <Row gutter={[24, 12]}>
        <Col xs={24} md={24}>
          <Title level={2}>Thêm tài khoản người dùng</Title>
          <Card>
            <Form
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Tên tài khoản phải là bắt  buộc",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="phoneNumber" name="phoneNumber">
                <Input />
              </Form.Item>
              <Form.Item
                label="email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "email không được bỏ trống",
                  },
                  {
                    type: "email",
                    message: "Email chưa đúng định dạng",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Mật khẩu" name="password">
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={loading}
                >
                  Thêm
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={24}>
          <Title level={2}>Danh sách tài khoản người dùng</Title>
          <Button
            style={{
              marginBottom: 20,
            }}
            type="primary"
            onClick={() => {
              const excel = new Excel();
              excel
                .addSheet("test")
                .addColumns(columns1)
                .addDataSource(data)
                .saveAs("Danh_sách_người_dùng.xlsx");
            }}
          >
            Xuất Excel
          </Button>
          <Card>
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Chỉnh sửa Tài khoản người dùng"
        open={edit}
        okText="Chỉnh sửa"
        onCancel={() => setEdit(false)}
        onOk={async () => {
          try {
            const res = await putUserApi(
              a?._id,
              a?.username,
              a?.email,
              a?.phoneNumber
            );
            message.success("Cập nhập thành công");
            GetUser();
            setEdit(false);
          } catch (error) {
            message.warning("Cập nhập thất bại");
            setEdit(false);
          }
        }}
      >
        <Row gutter={[0, 8]}>
          <Col xs={24} md={24}>
            <Input
              placeholder="Tài khoản"
              value={a?.username}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, username: e.target.value };
                })
              }
            />
          </Col>
          <Col xs={24} md={24}>
            <Input
              placeholder="số điện thoại"
              value={a?.phoneNumber}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, phoneNumber: e.target.value };
                })
              }
            />
          </Col>
          <Col xs={24} md={24}>
            <Input
              placeholder="Email"
              value={a?.email}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, email: e.target.value };
                })
              }
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Tables;

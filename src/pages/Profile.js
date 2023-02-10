import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Button,
  message,
  Table,
  Space,
  Modal,
} from "antd";
import { Typography } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import {
  categoryAPI,
  DeletegetcategoryAPI,
  getcategoryAPI,
  putgetcategoryAPI,
} from "../Api/category/CategoryApi";

const { Title } = Typography;

const Profile = () => {
  const columns = [
    {
      id: "name",
      title: "Tên  loại áo",
      dataIndex: "name",
      key: "name",
    },
    {
      id: "description",
      title: "Mô tả về loại áo",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => Editdata(record)} />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => Deletedata(record)}
          />
        </Space>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  const [data, SetData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [a, seta] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await categoryAPI(values.name, values.description);
      setLoading(false);

      Getdata();
      message.success("bạn đã thêm thành công");
    } catch (error) {
      message.warning(error.message);
      setLoading(false);
    }
  };

  const Getdata = async () => {
    try {
      const res = await getcategoryAPI();
      SetData(res.result.categories);
    } catch (error) {
      message.warning(error.message);
    }
  };

  const Deletedata = async (record) => {
    try {
      const data = await DeletegetcategoryAPI(record._id);
      message.success("bạn đã xóa thành công");
      Getdata();
    } catch (error) {
      message.warning(error.message);
    }
  };
  const Editdata = async (record) => {
    setEdit(true);
    seta(record);
  };

  useEffect(() => {
    Getdata();
  }, []);

  return (
    <div>
      <Row gutter={[24, 12]}>
        <Col xs={24} md={24}>
          <Title level={2}>Thêm các loại áo</Title>
          <Card>
            <Form
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="Tên lại áo"
                name="name"
                rules={[
                  { required: true, message: "Tên loại áo phải là bắt buộc" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Mô tả về lại áo" name="description">
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Thêm
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={24}>
          <Title level={2}>Danh sách các loại áo</Title>
          <Card>
            <Table dataSource={data} columns={columns} />;
          </Card>
        </Col>
      </Row>
      <Modal
        title="Chỉnh sửa Tên loại áo"
        open={edit}
        okText="Chỉnh sửa"
        onCancel={() => setEdit(false)}
        onOk={async () => {
          try {
            const res = await putgetcategoryAPI(
              a?.name,
              a?.description,
              a?._id
            );
            message.success("Cập nhập thành công");
            Getdata();
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
              placeholder="Tên lại áo"
              value={a?.name}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, name: e.target.value };
                })
              }
            />
          </Col>
          <Col xs={24} md={24}>
            <Input
              placeholder="Mô tả về lại áo"
              value={a?.description}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, description: e.target.value };
                })
              }
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Profile;

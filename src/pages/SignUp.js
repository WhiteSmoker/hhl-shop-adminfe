import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Space,
  Table,
  Upload,
  Modal,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { createGlobalStyle } from "styled-components";
import {
  blogAPI,
  DeleteblogAPI,
  editblogAPI,
  getblogApi,
} from "../Api/blog/Blog";

const Blog = () => {
  const columns = [
    {
      title: "Tiêu đề bài viết",
      dataIndex: "title",
      key: "title",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Nội dung bài viết",
      dataIndex: "detail",
      key: "detail",
      width: 300,
      ellipsis: true,
    },
    {
      title: "Ngày tạo tài khoản",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, e) => (
        <Image
          src={e.image?.url}
          key={e.image?._id}
          width={90}
          height={100}
          style={{ borderRadius: "5px", padding: "5px" }}
        />
      ),
    },
    {
      title: "Ngày tạo bài viết",
      dataIndex: "createdAt",
      key: "cre<atedAt",
      render: (createdAt) => (
        <div>{moment(createdAt).format("MMMM Do YYYY")}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => Editdata(record)} />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => DeleteUser(record)}
          />
        </Space>
      ),
    },
  ];

  const [tempImg, setTempImg] = useState("");

  const [img, setImg] = useState({ file: null, base64URL: "" });
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const handleFileInputChange = (e) => {
    let { file } = img;
    file = e.target.files[0];

    let reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      console.log("reader.result..", reader.result);
      setTempImg([reader.result]);
    }.bind(this);

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        form.setFieldValue("upload", file.base64);
        setImg({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setImg({
      file: e.target.files[0],
    });
  };
  const [img1, setImg1] = useState("");
  const handleFileInputChange2 = (e) => {
    let { file } = img;
    file = e.target.files[0];

    let reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      console.log("reader.result..", reader.result);
      setTempImg([reader.result]);
    }.bind(this);

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setImg1(file.base64);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeleteUser = async (record) => {
    try {
      const data = await DeleteblogAPI(record._id);
      message.success("bạn đã xóa thành công");
      getBlog();
    } catch (error) {
      message.warning(error.message);
    }
  };
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const refImg = useRef(null);

  const getBlog = async () => {
    try {
      const res = await getblogApi();
      setData(res.result.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    console.log("values.upload", values.upload);
    try {
      const res = await blogAPI(values.title, values.detail, values.upload);
      console.log(res);
      getBlog();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);
  const [edit, setEdit] = useState(false);
  const [a, seta] = useState([]);

  const closeModal = () => {
    setEdit(false);
  };

  const Editdata = async (record) => {
    setEdit(true);
    seta(record);
  };

  return (
    <div>
      <Row gutter={[24, 12]}>
        <Col xs={24} md={24}>
          <Title level={2}>Thêm tin tức</Title>
          <Card>
            <Form
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              form={form}
            >
              <Form.Item label="Tên tiêu đề" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Nội dung bài viết" name="detail">
                <TextArea />
              </Form.Item>
              <Form.Item
                name="upload"
                label="Thêm ảnh cho sản phẩm"
                valuePropName="fileList"
                rules={[
                  {
                    required: true,
                    message: "Bạn cần phải thêm ảnh ",
                  },
                ]}
              >
                <input
                  type="file"
                  name="file"
                  onChange={handleFileInputChange}
                />
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
          <Title level={2}>Danh sách tin tức</Title>
          <Card>
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
        <Modal
          title="Chỉnh sửa tin tức"
          open={edit}
          okText="Chỉnh sửa"
          onCancel={closeModal}
          onOk={async () => {
            console.log(
              "a?._id, a?.title, a?.detail, img1",
              a?._id,
              a?.title,
              a?.detail,
              img1
            );
            try {
              const res = await editblogAPI(a?._id, a?.title, a?.detail, img1);
              message.success("Cập nhập thành công");
              getBlog();
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
                placeholder="Tiêu đề bài viết"
                value={a?.title}
                onChange={(e) =>
                  seta((c) => {
                    return { ...c, title: e.target.value };
                  })
                }
              />
            </Col>
            <Col xs={24} md={24}>
              <TextArea
                placeholder="Nội dung bài viết"
                value={a?.detail}
                onChange={(e) =>
                  seta((c) => {
                    return { ...c, detail: e.target.value };
                  })
                }
              />
            </Col>
            <Col xs={24} md={24}>
              <label htmlFor="imgEditProduct" ref={refImg}>
                <img
                  style={{ width: "250px", height: "200px" }}
                  className="object-contain max-h-[128px]"
                  alt="logo-company"
                  src={tempImg || a.image?.url}
                />
              </label>
              <input
                type="file"
                name="file"
                hidden
                id="imgEditProduct"
                onChange={handleFileInputChange2}
              />
            </Col>
          </Row>
        </Modal>
      </Row>
    </div>
  );
};

export default Blog;

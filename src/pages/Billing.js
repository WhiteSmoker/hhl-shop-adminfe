import {
  Row,
  Col,
  Table,
  Space,
  Form,
  Input,
  Button,
  Modal,
  Card,
  Image,
  Divider,
  message,
} from "antd";
import { Select } from "antd";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import Column from "antd/lib/table/Column";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { getcategoryAPI } from "../Api/category/CategoryApi";
import TextArea from "antd/es/input/TextArea";
import {
  deleteProductApi,
  editproductApi,
  getProductApi,
  productAPI,
} from "../Api/product/productApi";
import Title from "antd/es/typography/Title";

const Color = [
  {
    id: "1",
    name: "Black",
    color: "#000000",
  },
  {
    id: "2",
    name: "Brown",
    color: "#6F3E18",
  },
  {
    id: "3",
    name: "Yellow",
    color: "#D4BE8D",
  },
  {
    id: "4",
    name: "Gray",
    color: "#838383",
  },
  {
    id: "5",
    name: "White",
    color: "#F3F3F3",
  },
  {
    id: "6",
    name: "Blue",
    color: "#0F73AD",
  },
];
const Size = [
  {
    id: 1,
    name: "XS",
  },
  {
    id: 2,
    name: "S",
  },
  {
    id: 3,
    name: "M",
  },
  {
    id: 4,
    name: "L",
  },
  {
    id: 5,
    name: "XL",
  },
  {
    id: 6,
    name: "XXL",
  },
];

const Billing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempImg, setTempImg] = useState("");
  const [select, setSelect] = useState([]);
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  const refImg = useRef(null);
  //add size,màu

  const getSelect = async () => {
    try {
      const res = await getcategoryAPI();
      setSelect(res.result.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
    console.log("isModalOpen", isModalOpen);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //Modal
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
  //select
  const [selectdata, setSelectData] = useState([]);
  const handleGetSelect = (id) => {
    const datab = data.filter((e) => e.categoryId === id);
    setSelectData(datab);
  };
  const onFinishsearch = (values) => {
    console.log(values);
  };
  //Hiển thị sản phẩm
  const [data, setData] = useState([]);
  const getProduct = async () => {
    try {
      const res = await getProductApi();
      setData(res.result.products);
      setSelectData(res.result.products);
    } catch (error) {
      console.log(error);
    }
  };
  //thếm sản phẩm
  const onFinish = async (values) => {
    try {
      const res = await productAPI(
        values.name,
        values.price,
        values.upload,
        values.description,
        values.quantity,
        values.categoryId,
        values.amount
      );
      getProduct();
      message.success("bạn đã thêm thành công");
    } catch (error) {
      message.warning(error.message);
    }
  };
  //Xóa sản phẩm
  const Deletedata = async (record) => {
    try {
      const data = await deleteProductApi(record._id);
      message.success("bạn đã xóa thành công");
      getProduct();
    } catch (error) {
      message.warning(error.message);
    }
  };
  const [a, seta] = useState([]);
  const Editdata = (record) => {
    setEdit(true);
    seta(record);
  };

  //thêm ảnh lỗi đm
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
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
  const handleFileInputChange = (e) => {
    console.log("a", e.target.files[0]);
    let { file } = img;

    file = e.target.files[0];

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

  useEffect(() => {
    getSelect();
    getProduct();
  }, []);

  return (
    <>
      <Row gutter={[24, 12]}>
        <Col xs={24} md={24}>
          <Title level={2}>Thêm và tìm kiếm quần áo theo loại</Title>
          <Card>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col xs={8} md={8}>
                <Select
                  style={{
                    width: 350,
                  }}
                  defaultValue="Chọn loại áo mong muốn"
                  onChange={handleGetSelect}
                >
                  {select?.map((item, i) => (
                    <Select.Option
                      value={item._id}
                      key={item._id}
                      label={item.name}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col xs={8} md={8}>
                <Button type="primary" onClick={showModal}>
                  Thêm sản phẩm
                </Button>
              </Col>
              <Col xs={8} md={8}>
                <Form
                  onFinish={onFinishsearch}
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Form.Item>
                    <Input placeholder="nhập sản phẩm cần tìm" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={24}>
          <Title level={2}>Danh sách sản phẩm</Title>
          <Card>
            <Table dataSource={selectdata}>
              <ColumnGroup>
                <Column title="Tên áo" dataIndex="name" key="name" />
              </ColumnGroup>
              <Column
                title="Hình ảnh"
                dataIndex="image"
                key="image"
                render={(_, e) => (
                  <Image
                    src={e.image?.url}
                    key={e.image?._id}
                    width={90}
                    height={100}
                    style={{ borderRadius: "5px", padding: "5px" }}
                  />
                )}
              />
              <Column title="Số lượng" dataIndex="amount" key="amount" />
              <Column
                title="màu"
                dataIndex="quantity"
                key="quantity"
                render={(tags) => (
                  <>
                    {tags.map((tag) => (
                      <p> {tag.color},</p>
                    ))}
                  </>
                )}
              />
              <Column
                title="size"
                dataIndex="quantity"
                key="quantity"
                render={(tags) => (
                  <>
                    {tags.map((tag) => (
                      <p> {tag.size}</p>
                    ))}
                  </>
                )}
              />
              <Column
                title="Giá tiền"
                key="price"
                render={(_, record) => (
                  <span>{record.price.toLocaleString()}đ</span>
                )}
              />
              <Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <Space size="middle">
                    <EditOutlined onClick={() => Editdata(record)} />
                    <DeleteOutlined
                      style={{ color: "red" }}
                      onClick={() => Deletedata(record)}
                    />{" "}
                    {},
                  </Space>
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Thêm loại áo mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        destroyOnClose={true}
      >
        <Form
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          form={form}
        >
          <Form.Item
            name="name"
            label="Tên áo"
            rules={[
              {
                required: true,
                message: "Bạn cần phải thêm tên áo",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="chọn loại áo"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Bạn cần phải chọn loại áo mong muốn",
              },
            ]}
          >
            <Select
              style={{
                width: 350,
              }}
              defaultValue="Chọn loại áo mong muốn"
              onChange={handleGetSelect}
            >
              {select?.map((item, i) => (
                <Select.Option
                  value={item._id}
                  key={item._id}
                  label={item.name}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="mô tả sản phẩm" name="description">
            <TextArea
              maxLength={100}
              style={{ height: 120, marginBottom: 24 }}
            />
          </Form.Item>

          {/* ảnh */}
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
            <input type="file" name="file" onChange={handleFileInputChange} />
          </Form.Item>
          <Form.Item
            name="price"
            label="giá tiền"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập giá áo",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="amount"
            label="số lượng"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập giá áo",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.List
            autoComplete="off"
            name="quantity"
            initialValue={[{ color: "", size: "" }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div>
                    <Divider> Thêm mẫu áo :{name + 1}</Divider>
                    <Form.Item
                      {...restField}
                      label="Chọn màu"
                      name={[name, "color"]}
                      rules={[
                        {
                          required: true,
                          message: "Màu không được bỏ trống",
                        },
                      ]}
                    >
                      <Select>
                        {Color.map((item, i) => (
                          <Select.Option value={item.name} key={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Chọn Size"
                      name={[name, "size"]}
                      rules={[
                        {
                          required: true,
                          message: "size không được bỏ trống",
                        },
                      ]}
                    >
                      <Select>
                        {Size.map((item, i) => (
                          <Select.Option value={item.name} key={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                      {fields.length > 1 ? (
                        <Button
                          type="primary"
                          style={{ width: "100%" }}
                          onClick={() => remove(name)}
                          icon={<MinusCircleOutlined />}
                        >
                          Xóa
                        </Button>
                      ) : null}
                    </Form.Item>
                  </div>
                ))}
                <Form.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button type="dashed" onClick={() => add()}>
                    <PlusOutlined /> Thêm
                  </Button>
                </Form.Item>
                <Divider />
              </>
            )}
          </Form.List>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
              }}
            >
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa sản phẩm người dùng"
        open={edit}
        okText="Chỉnh sửa"
        onCancel={() => setEdit(false)}
        onOk={async () => {
          try {
            const res = await editproductApi(
              a?._id,
              a?.name,
              a?.price,
              img1,
              a?.description,
              a?.amount,
              a?.quantity
            );
            message.success("Cập nhập thành công");
            getProduct();
            setEdit(false);
          } catch (error) {
            message.warning("Cập nhập thất bại");
            setEdit(false);
          }
        }}
        width={"1080px"}
      >
        <Row gutter={[0, 8]}>
          <Col xs={24} md={24}>
            <Input
              placeholder="Tài khoản"
              value={a?.name}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, name: e.target.value };
                })
              }
            />
          </Col>
          <Col xs={24} md={24}>
            <TextArea
              maxLength={100}
              style={{ height: 120, marginBottom: 24 }}
              placeholder="Mô tả sản phẩm"
              value={a?.description}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, description: e.target.value };
                })
              }
            />
          </Col>
          <Col xs={24} md={24}>
            <Input
              placeholder="Tổng tiền"
              value={a?.price}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, price: e.target.value };
                })
              }
            />
          </Col>
          <Col xs={24} md={24}>
            <Input
              placeholder="Số lượng"
              value={a?.amount}
              onChange={(e) =>
                seta((c) => {
                  return { ...c, amount: e.target.value };
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
          <Col>
            {a?.quantity?.map((i) => (
              <Row>
                <Col xs={12} span={12}>
                  <Input
                    value={i.color}
                    placeholder="màu áo"
                    onChange={(e) =>
                      seta((c) => {
                        return { ...c, color: e.target.value };
                      })
                    }
                  />
                </Col>
                <Col xs={12} span={12}>
                  <Input
                    value={i.size}
                    placeholder="size áo"
                    onChange={(e) =>
                      seta((c) => {
                        return { ...c, size: e.target.value };
                      })
                    }
                  />
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Billing;

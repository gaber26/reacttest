import "./index.css";
import React from "react";
import { articleList, articleAdd, articleUpdate, articleDelete } from "../../lib/api";
import { Table, Input, Modal, Popconfirm, Row, Col, Button, message } from "antd";
const { Search } = Input;

const onSearch = (value) => {
  console.log(value);
};
class Index extends React.Component {
  // 类名  继承  react组件
  constructor(props) {
    // 构造
    super(props); // 调用父级方法
    this.state = {
      dataSource: [],
      current: 1, // 当前页
      size: 10, // 每页显示
      total: 0, // 总条数
      loading: false,
      showQuickJumper: true, //是否点击跳转
      isModalVisible: false,
      setIsModalVisible: false,
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "书名",
          dataIndex: "name",
          key: "name",
          render: (_, record) => (
            <div>
              <span className="edit" onClick={() => this.handleDetail(record.id)}>
                <a>{record.name}</a>
              </span>
            </div>
          ),
        },
        {
          title: "作者",
          dataIndex: "author",
          key: "author",
        },
        {
          title: "出版社",
          dataIndex: "publish",
          key: "publish",
        },
        {
          title: "价格",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "操作",
          dataIndex: "operation",
          render: (_, record) => (
            <div>
              <span className="edit" onClick={() => this.handleEdit(record)}>
                <a>编辑</a>
              </span>
              <Popconfirm title="确定删除吗?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.id)}>
                <a>删除</a>
              </Popconfirm>
            </div>
          ),
        },
      ],
      //编辑
      id: "",
      name: "",
      author: "",
      publish: "",
      price: "",
      //公共
      title: "新增",
    };
  }
  render() {
    return (
      <div>
        {/* 表头 */}
        <div className="search">
          <Search placeholder="请输入书名" allowClear enterButton="搜索" onSearch={onSearch} />
          <Button className="btn" type="primary" onClick={() => this.handleAdd()}>
            新增
          </Button>
        </div>
        <Table rowKey="id" loading={this.state.loading} bordered dataSource={this.state.dataSource} columns={this.state.columns} pagination={this.fenye()} />

        <Modal okText="确认" cancelText="取消" title={this.state.title} visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
          <Row className="row">
            <Col span={4}>书名</Col>
            <Col span={16}>
              <Input placeholder="书名" value={this.state.name} onChange={() => this.nameChange(event)} />
            </Col>
          </Row>
          <Row className="row">
            <Col span={4}>作者</Col>
            <Col span={16}>
              <Input placeholder="作者" value={this.state.author} onChange={() => this.authorChange(event)} />
            </Col>
          </Row>
          <Row className="row">
            <Col span={4}>出版社</Col>
            <Col span={16}>
              <Input placeholder="出版社" value={this.state.publish} onChange={() => this.publishChange(event)} />
            </Col>
          </Row>
          <Row className="row">
            <Col span={4}>价格</Col>
            <Col span={16}>
              <Input placeholder="价格" value={this.state.price} onChange={() => this.priceChange(event)} />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
  componentDidMount() {
    console.log("componentDidMount-----组件已经挂载到页面的时候");
    this.getBook(this.state.current, this.state.size); //获取列表接口
  }
  //分页
  fenye() {
    const fy = {
      current: this.state.current, // 当前页
      pageSize: this.state.size, // 每页显示
      total: this.state.total, // 总条数
      onChange: (current) => {
        // 点击下一页
        this.setState({
          current: current,
        });
        this.getBook(current, 10);
      },
      // 每页显示变化
      onShowSizeChange: (Current, pageSize) => {
        console.log(pageSize);
        this.getBook(Current, pageSize);
      },
      showQuickJumper: this.state.showQuickJumper, //是否可以跳转
    };
    return fy;
  }
  //列表接口
  async getBook(current, size) {
    this.setState({ loading: true });
    let res = await articleList({ current: current, size: size });
    console.log("列表", res.data.content);
    if (res.data.content.length) {
      this.setState({
        loading: false,
        dataSource: res.data.content,
        total: res.data.totalElements,
      });
    }
  }
  /**
   * 删除模块
   */
  handleDelete(key) {
    this.getBookDeletel(key);
  }
  //删除接口
  getBookDeletel(id) {
    articleDelete(id).then((res) => {
      if (res.status == 200) {
        message.warning("删除成功");
        this.getBook(this.state.current, this.state.size); //获取列表接口
      }
    });
  }
  /**
   * 新增模块
   */
  handleAdd() {
    this.setState({
      isModalVisible: true,
      title: "新增",
    });
  }
  //新增接口
  getAdd(data) {
    articleAdd(data).then((res) => {
      if (res.status == 200) {
        message.success("新增成功");
        this.getBook(this.state.current, this.state.size); //获取列表接口
      }
    });
  }
  /**
   * 详情模块
   */
  handleDetail(id) {
    this.props.history.push({ pathname: `/bookDetail`, state: { id: id } });
  }
  /**
   * 编辑模块
   */
  handleEdit(key) {
    this.setState({
      isModalVisible: true,
      title: "编辑",
      id: key.id,
      name: key.name,
      author: key.author,
      publish: key.publish,
      price: key.price,
    });
  }
  /**
   * 弹出框模块
   */
  getBookUpdate(data) {
    articleUpdate(data).then((res) => {
      if (res.status == 200) {
        message.success("修改成功");
        this.getBook(this.state.current, this.state.size); //获取列表接口
      }
    });
  }
  nameChange(event) {
    this.setState({ name: event.target.value });
  }
  authorChange(event) {
    this.setState({ author: event.target.value });
  }
  publishChange(event) {
    this.setState({ publish: event.target.value });
  }
  priceChange(event) {
    this.setState({ price: event.target.value });
  }
  //弹出框确定
  handleOk() {
    this.setState({
      isModalVisible: false,
    });
    if (this.state.id) {
      let data = {
        id: this.state.id,
        name: this.state.name,
        author: this.state.author,
        publish: this.state.publish,
        price: this.state.price,
      };
      this.getBookUpdate(data);
    } else {
      let data = {
        name: this.state.name,
        author: this.state.author,
        publish: this.state.publish,
        price: this.state.price,
      };
      this.getAdd(data);
    }
  }
  //弹出框取消
  handleCancel() {
    this.setState({
      isModalVisible: false,
      id: "",
      name: "",
      author: "",
      publish: "",
      price: "",
    });
  }
}

export default Index;

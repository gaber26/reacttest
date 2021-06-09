import "./index.css";
import React from "react";
import { articleDetail } from "../../lib/api";
import { Alert, Card } from "antd";

class Index extends React.Component {
  // 类名  继承  react组件
  constructor(props) {
    super(props);
    this.state = {
      bookDetail: {
        name: "",
        author: "",
        publish: "",
        price: "",
      },
    };
  }
  render() {
    return (
      <div>
        <Alert message="书名：" description={this.state.bookDetail.name} type="success" />
        <Card title="详情信息" style={{ marginTop: 20 }}>
          <p>书名： {this.state.bookDetail.name}</p>
          <p>作者： {this.state.bookDetail.author}</p>
          <p>出版社： {this.state.bookDetail.publish}</p>
          <p>价格： {this.state.bookDetail.price}</p>
        </Card>
        <Card title="文章内容" style={{ marginTop: 20 }}>
          <p> {this.state.bookDetail.content}</p>
        </Card>
      </div>
    );
  }
  componentWillMount() {}
  componentDidMount() {
    console.log("componentDidMount-----组件已经挂载到页面的时候");    
    if (this.props.location.state) {
      let id = this.props.location.state.id;
      this.getBookDetail(id);
    }
  }
  getBookDetail(id) {
    articleDetail(id).then((res) => {
      let data = res.data;
      if (typeof data == "object") {
        this.setState({
          bookDetail: data,
        });
      }
    });
  }
}

export default Index;

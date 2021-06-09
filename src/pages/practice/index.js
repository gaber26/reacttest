import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.scss";
import PracticeItem from "./component/practiceItem";
import { articleAdd } from "../../lib/api";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Form, Input, Button, message } from "antd";
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 16,
  },
};

class Practice extends Component {
  // 类名  继承  react组件
  constructor(props) {
    // 构造
    super(props); // 调用父级方法
    this.state = {
      list: [],
    };
  }

  // componentWillMount () {
  //   console.log('componentWillMount-----组件将要挂载到页面的时候')
  // }

  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log('shouldComponentUpdate-----组件更新之前  1')
  //   return true
  // }

  // componentWillUpdate () {
  //   console.log('componentWillUpdate-----组件更新之前  2')
  // }

  render() {
    return (
      <Fragment>
        {/* 外层类似vue必须加一层盒子，但是加了这个就可以不用增加额外盒子 */}
        {/* 绑定事件必须要.bind(this)进去，或者使用箭头函数，不然无法找到this */}
        <div>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            ref="form"
            onFinish={(values) => this.onAdd(values)}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="书名"
              name="name"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="作者"
              name="author"
              rules={[
                {
                  required: true,
                  message: "请输入作者",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="出版社"
              name="publish"
              rules={[
                {
                  required: true,
                  message: "请输入出版社",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="价格"
              name="price"
              rules={[
                {

                  required: true,
                  message: "请输入价格",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="content" label="内容">
              <Input.TextArea rows={10} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                新增
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ul>
          <TransitionGroup>
            {this.state.list.map((item, index) => {
              return (
                <CSSTransition timeout={10} unmountOnExit appear={true} key={index}>
                  <PracticeItem
                    key={index}
                    content={item}
                    index={index}
                    delItem={() => {
                      this.delItem(index);
                    }}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ul>
      </Fragment>
    );
  }

  componentDidUpdate() {
    console.log("componentDidUpdate-----所有挂载完毕执行   4");
  }

  componentDidMount() {
    console.log("componentDidMount-----组件已经挂载到页面的时候");
  }
  //新增
  onAdd(values) {
    this.state.list.push(values);
    this.getAdd(values);
    this.setState({
      list: this.state.list,
    });
    if (values) {
      this.refs.form.resetFields();
    }
  }
  getAdd(data) {
    articleAdd(data).then((res) => {
      if (res.status == 200) {
        message.success("新增成功");
        setTimeout(() => {
          this.props.history.push("/book");
        }, 1000);
      }
    });
  }
  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
  //删除
  delItem(index) {
    // 数据操作必须重新赋值操作，不能直接改变state里面的数据
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list: list,
    });
  }
}

export default Practice;

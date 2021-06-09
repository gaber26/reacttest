import logo from "../../assets/images/logo.svg";
import "./index.css";
import React from "react";
import { Calendar, Alert } from "antd";

class Index extends React.Component {
  // 类名  继承  react组件
  render() {
    return (
      <div>
        <Alert message="日历" type="success" style={{marginBottom:20, fontSize: 22, textAlign:'center'}}/>
        <Calendar onPanelChange={()=>this.onPanelChange} />
      </div>
    );
  }
  onPanelChange(value, mode) {
    console.log(value.format("YYYY-MM-DD"), mode);
  }
}

export default Index;

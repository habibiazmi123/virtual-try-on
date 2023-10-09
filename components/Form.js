import React, { useEffect } from "react";
import Toggle from "./Toggle.Component";
import Switch from "@chakra-ui/react";
export default class Form extends React.Component {
  state = {
    checked: true,
    size: "large",
    disabled: false,
    ActionCamera:"Otomatis"
  };
  
  handleChange = e => {
    this.setState({ checked: e.target.checked });
    if(e.target.checked===false){
        localStorage.setItem('actioncamera','Manual');
    }else{
        localStorage.setItem('actioncamera','Otomatis');
    }
    //console.log(this.state.actioncamera)
    
  };


  setSize(e) {
    this.setState(prevState => ({
      size: prevState.size === "default" ? "large" : "default"
    }));
  }

  setDisable(e) {
    this.setState(prevState => ({
      disabled: !prevState.disabled
    }));
  }

  render() {
    return (
      <form>
        {/* {console.log(this.state.ActionCamera)} */}
        <Toggle 
          checked={this.state.checked}
          size="default"
          disabled={this.state.disabled}
          onChange={this.handleChange}
          offstyle="btn-danger"
          onstyle="btn-success"
        />
      </form>
    );
  }
}


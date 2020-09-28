import React from "react";
import "./App.css";
import Header from "./Header"

class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      character: {}
    }
  }

  // componentDidMount() {

  // }




  render() {
    return (
      <div className="App" >
        <Header />
      </div >
    )

  }
}

export default App;

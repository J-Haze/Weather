import React from "react";
import "./App.css";
import Weather from "./components/Weather"
import Results from "./components/Results"

function App() {
  return (
    <div className="App" >
      <header>
        <Weather />
      </header>
      <main>
        <Results></Results>
      </main>
    </div >
  )

}

export default App;

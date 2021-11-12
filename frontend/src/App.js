import React from "react";

import SideBar from "./Component/Navbar/Sidebar";
import Footer from "./Component/Footer/footer";
import "./App.css";

function App() {
  return (
      <React.Fragment>
        <div className="App">
          <SideBar />
          {/* <Footer /> */}
        </div>
      </React.Fragment>
    );
}
export default App;
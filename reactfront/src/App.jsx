import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import ShopForm from "./components/ShopForm";

import MobileForm from "./components/MobileForm";
import ShopList from "./components/ShopList";


import MobileList from "./components/MobileList";


function App() {
  return (
    <div>

      <h1 className="title1">
        PRADHEEPSIVA MOBILES
      </h1>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<ShopForm />}
        />

<Route
  path="/shoplist"
  element={<ShopList />}
/>
        <Route
          path="/mobile"
          element={<MobileForm />}
        />

        <Route
          path="/mobilelist"
          element={<MobileList />}
        />

      </Routes>

    </div>
  );
}

export default App;
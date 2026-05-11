import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import ShopForm from "./components/ShopForm";

import MobileForm from "./components/MobileForm";

import ShopList from "./components/ShopList";

import MobileList from "./components/MobileList";

import AdminCreateUser from "./pages/AdminCreateUser";

import ShopLogin from "./pages/ShopLogin";

import ShopMobiles from "./pages/ShopMobiles";

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
          path="/mobile"
          element={<MobileForm />}
        />

        <Route
          path="/shoplist"
          element={<ShopList />}
        />

        <Route
          path="/mobilelist"
          element={<MobileList />}
        />

        <Route
          path="/admin"
          element={<AdminCreateUser />}
        />

        <Route
          path="/shoplogin"
          element={<ShopLogin />}
        />

        <Route
          path="/shopmobiles"
          element={<ShopMobiles />}
        />

      </Routes>

    </div>

  );
}

export default App;
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import ShopForm from "./components/ShopForm";

import MobileForm from "./components/MobileForm";

import ShopList from "./components/ShopList";

import MobileList from "./components/MobileList";

// NEW PAGES
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

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* MOBILE LIST */}

        <Route
          path="/mobilelist"
          element={<MobileList />}
        />

        {/* SHOP LIST */}

        <Route
          path="/shoplist"
          element={<ShopList />}
        />

        {/* ADD SHOP */}

        <Route
          path="/shop"
          element={<ShopForm />}
        />

        {/* ADD MOBILE */}

        <Route
          path="/mobile"
          element={<MobileForm />}
        />

        {/* ADMIN CREATE USER */}

        <Route
          path="/admin"
          element={<AdminCreateUser />}
        />

        {/* SHOP LOGIN */}

        <Route
          path="/shoplogin"
          element={<ShopLogin />}
        />

        {/* SHOP MOBILES */}

        <Route
          path="/shopmobiles"
          element={<ShopMobiles />}
        />

      </Routes>

    </div>

  );
}

export default App;
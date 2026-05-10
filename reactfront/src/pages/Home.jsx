import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [totalMobiles, setTotalMobiles] = useState(0);

  const [pendingRepairs, setPendingRepairs] = useState(0);

  const [completedRepairs, setCompletedRepairs] = useState(0);

  // GET MOBILE DATA
  const getDashboardData = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/mobile/all"
      );

      const mobiles = response.data.data;

      // TOTAL MOBILES
      setTotalMobiles(mobiles.length);

      // PENDING COUNT
      const pending = mobiles.filter(
        (item) => item.status === "Pending"
      );

      setPendingRepairs(pending.length);

      // COMPLETED COUNT
      const completed = mobiles.filter(
        (item) => item.status === "Completed"
      );

      setCompletedRepairs(completed.length);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="home-container">

      <h2>Welcome to Pradheepsiva Mobiles</h2>

      <div className="home-cards">

        <div className="card">
          <h3>Total Mobiles</h3>

          <p>{totalMobiles}</p>
        </div>

        <div className="card">
          <h3>Pending Repairs</h3>

          <p>{pendingRepairs}</p>
        </div>

        <div className="card">
          <h3>Completed Repairs</h3>

          <p>{completedRepairs}</p>
        </div>

      </div>
    </div>
  );
}

export default Home;
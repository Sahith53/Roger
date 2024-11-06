import React, { useState, useEffect } from "react";
import Cards from "../../components/stats/Cards";
import { getStatsofUser } from "../../services/stats";
import MostPerson from "../../components/stats/MostPerson";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStats = await getStatsofUser();
        setStats(userStats);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats: ", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!stats) {
    return <div className="text-white">No stats available</div>;
  }

  return (
    <div className="text-white w-full">
      <div>
        <h1>Your Stats Bankai!</h1>
      </div>
      <div className="">
        <Cards stats={stats} />
      </div>
      <div>
        <MostPerson />
      </div>
    </div>
  );
};

export default Stats;

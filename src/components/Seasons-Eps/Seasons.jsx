import React, { useState, useEffect } from "react";
import Episodes from "./Episodes";
import Dropdown from "./Dropdown";

const Seasons = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  const handleChange = (selectedSeason) => {
    setSelectedSeason(selectedSeason);
  };

  useEffect(() => {
    // You can add additional logic here if needed
  }, [seasons]);

  return (
    <div className="w-full flex-col flex px-6 py-4">
      <div className="flex px-8 w-full justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Episodes</h1>
        <div className="ml-6">
          <Dropdown
            options={seasons}
            selectedOption={selectedSeason}
            onOptionSelect={handleChange}
          />
        </div>
      </div>
      <div className="py-10">
        <Episodes season={selectedSeason} />
      </div>
    </div>
  );
};

export default Seasons;

import React, { useEffect, useState } from "react";

import axios from "axios";

import AdvertsCard from "../Adverts/AdvertsCard"
// import RechercheForm from "../../components/RechercheForm";

const AdvertsList = () => {
  useEffect(() => {
    displayAdverts();
  }, []); // Sans les crochets ça tourne en boucle

  const [Adverts, setAdverts] = useState([]);

  const displayAdverts = async () => {
    await axios.get("http://127.0.0.1:8000/api/adverts").then((res) => {
      setAdverts(res.data);
    });
  };

  return (
    <div>
      {/* <RechercheForm/> */}

      <div className="row row-cols-1 row-cols-md-3 g-4 m-3 rounded-3 mt-4">
        {Adverts.map((advert, index) => (
          <AdvertsCard key={index} advert={advert} />
        ))}
      </div>
    </div>
  );
};

export default AdvertsList;

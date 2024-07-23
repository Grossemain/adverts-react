import React, { useEffect, useState } from "react";
import axios from "axios";
import AdvertsList from "../../components/public/Adverts/AdvertsList";


import RechercheForm from "../../components/public/recherche/RechercheForm";

const Adverts = () => {

    return (
        <div>
            <RechercheForm/>
            <AdvertsList/>
        </div>
    );
};

export default Adverts;

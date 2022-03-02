import PageTemplate from "../templates/Template";
import Car_AirportsTable from "./Car_AirportsTable";
import React from "react";

const Car_AirportsPage = (props) => {
    return(
    <PageTemplate title="Car_Airports List">
        <Car_AirportsTable/>
    </PageTemplate>)
}
export default Car_AirportsPage;

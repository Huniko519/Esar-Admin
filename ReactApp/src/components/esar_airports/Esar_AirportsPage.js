import PageTemplate from "../templates/Template";
import Esar_AirportsTable from "./Esar_AirportsTable";
import React from "react";

const Esar_AirportsPage = (props) => {
    return(
    <PageTemplate title="Esar_Airports List">
        <Esar_AirportsTable/>
    </PageTemplate>)
}
export default Esar_AirportsPage;

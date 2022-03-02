import PageTemplate from "../templates/Template";
import Temp_TripsTable from "./Temp_TripsTable";
import React from "react";

const Temp_TripsPage = (props) => {
    return(
    <PageTemplate title="Temp_Trips List">
        <Temp_TripsTable/>
    </PageTemplate>)
}
export default Temp_TripsPage;

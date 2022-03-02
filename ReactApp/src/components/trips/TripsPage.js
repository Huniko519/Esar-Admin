import PageTemplate from "../templates/Template";
import TripsTable from "./TripsTable";
import React from "react";

const TripsPage = (props) => {
    return(
    <PageTemplate title="Trips List">
        <TripsTable/>
    </PageTemplate>)
}
export default TripsPage;

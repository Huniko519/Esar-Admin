import PageTemplate from "../templates/Template";
import Car_AvailablesTable from "./Car_AvailablesTable";
import React from "react";

const Car_AvailablesPage = (props) => {
    return(
    <PageTemplate title="Car_Availables List">
        <Car_AvailablesTable/>
    </PageTemplate>)
}
export default Car_AvailablesPage;

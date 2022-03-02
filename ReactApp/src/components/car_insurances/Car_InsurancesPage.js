import PageTemplate from "../templates/Template";
import Car_InsurancesTable from "./Car_InsurancesTable";
import React from "react";

const Car_InsurancesPage = (props) => {
    return(
    <PageTemplate title="Car_Insurances List">
        <Car_InsurancesTable/>
    </PageTemplate>)
}
export default Car_InsurancesPage;

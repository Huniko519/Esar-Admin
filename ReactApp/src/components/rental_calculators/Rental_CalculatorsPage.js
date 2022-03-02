import PageTemplate from "../templates/Template";
import Rental_CalculatorsTable from "./Rental_CalculatorsTable";
import React from "react";

const Rental_CalculatorsPage = (props) => {
    return(
    <PageTemplate title="Rental_Calculators List">
        <Rental_CalculatorsTable/>
    </PageTemplate>)
}
export default Rental_CalculatorsPage;

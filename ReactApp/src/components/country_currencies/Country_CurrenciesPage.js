import PageTemplate from "../templates/Template";
import Country_CurrenciesTable from "./Country_CurrenciesTable";
import React from "react";

const Country_CurrenciesPage = (props) => {
    return(
    <PageTemplate title="Country_Currencies List">
        <Country_CurrenciesTable/>
    </PageTemplate>)
}
export default Country_CurrenciesPage;

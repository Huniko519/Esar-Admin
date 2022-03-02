import PageTemplate from "../templates/Template";
import CurrenciesTable from "./CurrenciesTable";
import React from "react";

const CurrenciesPage = (props) => {
    return(
    <PageTemplate title="Currencies List">
        <CurrenciesTable/>
    </PageTemplate>)
}
export default CurrenciesPage;

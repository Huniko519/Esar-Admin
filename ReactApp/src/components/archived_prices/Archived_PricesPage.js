import PageTemplate from "../templates/Template";
import Archived_PricesTable from "./Archived_PricesTable";
import React from "react";

const Archived_PricesPage = (props) => {
    return(
    <PageTemplate title="Archived_Prices List">
        <Archived_PricesTable/>
    </PageTemplate>)
}
export default Archived_PricesPage;

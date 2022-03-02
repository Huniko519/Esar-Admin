import PageTemplate from "../templates/Template";
import Custom_PricesTable from "./Custom_PricesTable";
import React from "react";

const Custom_PricesPage = (props) => {
    return(
    <PageTemplate title="Custom_Prices List">
        <Custom_PricesTable/>
    </PageTemplate>)
}
export default Custom_PricesPage;

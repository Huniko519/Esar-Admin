import PageTemplate from "../templates/Template";
import Car_RestrictionsTable from "./Car_RestrictionsTable";
import React from "react";

const Car_RestrictionsPage = (props) => {
    return(
    <PageTemplate title="Car_Restrictions List">
        <Car_RestrictionsTable/>
    </PageTemplate>)
}
export default Car_RestrictionsPage;

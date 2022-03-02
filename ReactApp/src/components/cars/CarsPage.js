import PageTemplate from "../templates/Template";
import CarsTable from "./CarsTable";
import React from "react";

const CarsPage = (props) => {
    return(
    <PageTemplate title="Cars List">
        <CarsTable/>
    </PageTemplate>)
}
export default CarsPage;

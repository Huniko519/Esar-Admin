import PageTemplate from "../templates/Template";
import Esar_CarsTable from "./Esar_CarsTable";
import React from "react";

const Esar_CarsPage = (props) => {
    return(
    <PageTemplate title="Esar_Cars List">
        <Esar_CarsTable/>
    </PageTemplate>)
}
export default Esar_CarsPage;

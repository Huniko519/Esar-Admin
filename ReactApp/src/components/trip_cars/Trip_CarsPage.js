import PageTemplate from "../templates/Template";
import Trip_CarsTable from "./Trip_CarsTable";
import React from "react";

const Trip_CarsPage = (props) => {
    return(
    <PageTemplate title="Trip_Cars List">
        <Trip_CarsTable/>
    </PageTemplate>)
}
export default Trip_CarsPage;

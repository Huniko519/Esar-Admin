import PageTemplate from "../templates/Template";
import Recently_Viewed_CarsTable from "./Recently_Viewed_CarsTable";
import React from "react";

const Recently_Viewed_CarsPage = (props) => {
    return(
    <PageTemplate title="Recently_Viewed_Cars List">
        <Recently_Viewed_CarsTable/>
    </PageTemplate>)
}
export default Recently_Viewed_CarsPage;

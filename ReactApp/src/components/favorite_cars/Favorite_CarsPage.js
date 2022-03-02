import PageTemplate from "../templates/Template";
import Favorite_CarsTable from "./Favorite_CarsTable";
import React from "react";

const Favorite_CarsPage = (props) => {
    return(
    <PageTemplate title="Favorite_Cars List">
        <Favorite_CarsTable/>
    </PageTemplate>)
}
export default Favorite_CarsPage;

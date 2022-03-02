import PageTemplate from "../templates/Template";
import Car_FeaturesTable from "./Car_FeaturesTable";
import React from "react";

const Car_FeaturesPage = (props) => {
    return(
    <PageTemplate title="Car_Features List">
        <Car_FeaturesTable/>
    </PageTemplate>)
}
export default Car_FeaturesPage;

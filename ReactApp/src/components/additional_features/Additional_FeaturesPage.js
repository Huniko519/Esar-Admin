import PageTemplate from "../templates/Template";
import Additional_FeaturesTable from "./Additional_FeaturesTable";
import React from "react";

const Additional_FeaturesPage = (props) => {
    return(
    <PageTemplate title="Additional_Features List">
        <Additional_FeaturesTable/>
    </PageTemplate>)
}
export default Additional_FeaturesPage;

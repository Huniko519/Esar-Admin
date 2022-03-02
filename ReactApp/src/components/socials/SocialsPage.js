import PageTemplate from "../templates/Template";
import SocialsTable from "./SocialsTable";
import React from "react";

const SocialsPage = (props) => {
    return(
    <PageTemplate title="Socials List">
        <SocialsTable/>
    </PageTemplate>)
}
export default SocialsPage;

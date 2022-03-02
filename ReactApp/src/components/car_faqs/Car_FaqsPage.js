import PageTemplate from "../templates/Template";
import Car_FaqsTable from "./Car_FaqsTable";
import React from "react";

const Car_FaqsPage = (props) => {
    return(
    <PageTemplate title="Car_Faqs List">
        <Car_FaqsTable/>
    </PageTemplate>)
}
export default Car_FaqsPage;

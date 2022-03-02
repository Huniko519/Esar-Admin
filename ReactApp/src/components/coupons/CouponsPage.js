import PageTemplate from "../templates/Template";
import CouponsTable from "./CouponsTable";
import React from "react";

const CouponsPage = (props) => {
    return(
    <PageTemplate title="Coupons List">
        <CouponsTable/>
    </PageTemplate>)
}
export default CouponsPage;

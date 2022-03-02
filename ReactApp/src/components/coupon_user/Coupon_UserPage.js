import PageTemplate from "../templates/Template";
import Coupon_UserTable from "./Coupon_UserTable";
import React from "react";

const Coupon_UserPage = (props) => {
    return(
    <PageTemplate title="Coupon_User List">
        <Coupon_UserTable/>
    </PageTemplate>)
}
export default Coupon_UserPage;

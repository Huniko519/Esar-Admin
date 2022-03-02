import PageTemplate from "../templates/Template";
import User_AvailablesTable from "./User_AvailablesTable";
import React from "react";

const User_AvailablesPage = (props) => {
    return(
    <PageTemplate title="User_Availables List">
        <User_AvailablesTable/>
    </PageTemplate>)
}
export default User_AvailablesPage;

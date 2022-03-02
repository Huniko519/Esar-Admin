import PageTemplate from "../templates/Template";
import Activity_NotificationsTable from "./Activity_NotificationsTable";
import React from "react";

const Activity_NotificationsPage = (props) => {
    return(
    <PageTemplate title="Activity_Notifications List">
        <Activity_NotificationsTable/>
    </PageTemplate>)
}
export default Activity_NotificationsPage;

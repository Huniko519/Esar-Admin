import PageTemplate from "../templates/Template";
import Car_UnlistedsTable from "./Car_UnlistedsTable";
import React from "react";

const Car_UnlistedsPage = (props) => {
    return(
    <PageTemplate title="Car_Unlisteds List">
        <Car_UnlistedsTable/>
    </PageTemplate>)
}
export default Car_UnlistedsPage;

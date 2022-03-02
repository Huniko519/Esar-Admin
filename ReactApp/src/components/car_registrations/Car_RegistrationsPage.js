import PageTemplate from "../templates/Template";
import Car_RegistrationsTable from "./Car_RegistrationsTable";
import React from "react";

const Car_RegistrationsPage = (props) => {
    return(
    <PageTemplate title="Car_Registrations List">
        <Car_RegistrationsTable/>
    </PageTemplate>)
}
export default Car_RegistrationsPage;

import PageTemplate from "../templates/Template";
import ReviewsTable from "./ReviewsTable";
import React from "react";

const ReviewsPage = (props) => {
    return(
    <PageTemplate title="Reviews List">
        <ReviewsTable/>
    </PageTemplate>)
}
export default ReviewsPage;

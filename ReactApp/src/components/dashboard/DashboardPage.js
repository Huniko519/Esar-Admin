import PageTemplate from "../templates/Template";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DashCard from "./DashboardCard"

const DashboardPage = () => {

    return(
    <PageTemplate title="Dashboard">
    <Grid container direction="row"  justify="center" alignItems="center">
    <DashCard pagename='activity_notifications'/>
<DashCard pagename='activity_requests'/>
<DashCard pagename='additional_features'/>
<DashCard pagename='admin_role'/>
<DashCard pagename='admins'/>
<DashCard pagename='android_versions'/>
<DashCard pagename='archived_prices'/>
<DashCard pagename='book_instantlies'/>
<DashCard pagename='car_airports'/>
<DashCard pagename='car_availables'/>
<DashCard pagename='car_faqs'/>
<DashCard pagename='car_features'/>
<DashCard pagename='car_images'/>
<DashCard pagename='car_insurances'/>
<DashCard pagename='car_registrations'/>
<DashCard pagename='car_restrictions'/>
<DashCard pagename='car_unlisteds'/>
<DashCard pagename='cars'/>
<DashCard pagename='chat_messages'/>
<DashCard pagename='chats'/>
<DashCard pagename='country_currencies'/>
<DashCard pagename='country_lists'/>
<DashCard pagename='coupon_user'/>
<DashCard pagename='coupons'/>
<DashCard pagename='currencies'/>
<DashCard pagename='custom_prices'/>
<DashCard pagename='driver_licences'/>
<DashCard pagename='error_logs'/>
<DashCard pagename='esar_airports'/>
<DashCard pagename='esar_cars'/>
<DashCard pagename='failed_jobs'/>
<DashCard pagename='favorite_cars'/>
<DashCard pagename='i_d__cards'/>
<DashCard pagename='ios_token'/>
<DashCard pagename='ios_versions'/>
<DashCard pagename='jobs'/>
<DashCard pagename='migrations'/>
<DashCard pagename='pending_emails'/>
<DashCard pagename='permission_role'/>
<DashCard pagename='permission_user'/>
<DashCard pagename='permissions'/>
<DashCard pagename='profiles'/>
<DashCard pagename='recently_viewed_cars'/>
<DashCard pagename='rental_calculators'/>
<DashCard pagename='reports'/>
<DashCard pagename='response_messages'/>
<DashCard pagename='review_messages'/>
<DashCard pagename='reviews'/>
<DashCard pagename='roles'/>
<DashCard pagename='sent_emails'/>
<DashCard pagename='social_connections'/>
<DashCard pagename='socials'/>
<DashCard pagename='supports'/>
<DashCard pagename='temp_messages'/>
<DashCard pagename='temp_profile_datas'/>
<DashCard pagename='temp_trips'/>
<DashCard pagename='transaction_logs'/>
<DashCard pagename='trip_bill_histories'/>
<DashCard pagename='trip_bills'/>
<DashCard pagename='trip_cancellations'/>
<DashCard pagename='trip_cars'/>
<DashCard pagename='trip_histories'/>
<DashCard pagename='trip_images'/>
<DashCard pagename='trip_notes'/>
<DashCard pagename='trips'/>
<DashCard pagename='user_availables'/>
<DashCard pagename='user_notes'/>
<DashCard pagename='users'/>

    
    
    
    </Grid>
    </PageTemplate>)
}
export default DashboardPage;


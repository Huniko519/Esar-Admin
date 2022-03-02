import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableChartIcon from '@material-ui/icons/TableChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import history from './../../history';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => history.push('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => history.push('/activity_notifications')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Activity_Notifications" />
</ListItem><ListItem button onClick={() => history.push('/activity_requests')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Activity_Requests" />
</ListItem><ListItem button onClick={() => history.push('/additional_features')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Additional_Features" />
</ListItem><ListItem button onClick={() => history.push('/admin_role')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Admin_Role" />
</ListItem><ListItem button onClick={() => history.push('/admins')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Admins" />
</ListItem><ListItem button onClick={() => history.push('/android_versions')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Android_Versions" />
</ListItem><ListItem button onClick={() => history.push('/archived_prices')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Archived_Prices" />
</ListItem><ListItem button onClick={() => history.push('/book_instantlies')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Book_Instantlies" />
</ListItem><ListItem button onClick={() => history.push('/car_airports')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Airports" />
</ListItem><ListItem button onClick={() => history.push('/car_availables')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Availables" />
</ListItem><ListItem button onClick={() => history.push('/car_faqs')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Faqs" />
</ListItem><ListItem button onClick={() => history.push('/car_features')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Features" />
</ListItem><ListItem button onClick={() => history.push('/car_images')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Images" />
</ListItem><ListItem button onClick={() => history.push('/car_insurances')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Insurances" />
</ListItem><ListItem button onClick={() => history.push('/car_registrations')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Registrations" />
</ListItem><ListItem button onClick={() => history.push('/car_restrictions')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Restrictions" />
</ListItem><ListItem button onClick={() => history.push('/car_unlisteds')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Car_Unlisteds" />
</ListItem><ListItem button onClick={() => history.push('/cars')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Cars" />
</ListItem><ListItem button onClick={() => history.push('/chat_messages')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Chat_Messages" />
</ListItem><ListItem button onClick={() => history.push('/chats')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Chats" />
</ListItem><ListItem button onClick={() => history.push('/country_currencies')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Country_Currencies" />
</ListItem><ListItem button onClick={() => history.push('/country_lists')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Country_Lists" />
</ListItem><ListItem button onClick={() => history.push('/coupon_user')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Coupon_User" />
</ListItem><ListItem button onClick={() => history.push('/coupons')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Coupons" />
</ListItem><ListItem button onClick={() => history.push('/currencies')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Currencies" />
</ListItem><ListItem button onClick={() => history.push('/custom_prices')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Custom_Prices" />
</ListItem><ListItem button onClick={() => history.push('/driver_licences')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Driver_Licences" />
</ListItem><ListItem button onClick={() => history.push('/error_logs')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Error_Logs" />
</ListItem><ListItem button onClick={() => history.push('/esar_airports')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Esar_Airports" />
</ListItem><ListItem button onClick={() => history.push('/esar_cars')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Esar_Cars" />
</ListItem><ListItem button onClick={() => history.push('/failed_jobs')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Failed_Jobs" />
</ListItem><ListItem button onClick={() => history.push('/favorite_cars')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Favorite_Cars" />
</ListItem><ListItem button onClick={() => history.push('/i_d__cards')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="I_D__Cards" />
</ListItem><ListItem button onClick={() => history.push('/ios_token')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ios_Token" />
</ListItem><ListItem button onClick={() => history.push('/ios_versions')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ios_Versions" />
</ListItem><ListItem button onClick={() => history.push('/jobs')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Jobs" />
</ListItem><ListItem button onClick={() => history.push('/migrations')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Migrations" />
</ListItem><ListItem button onClick={() => history.push('/pending_emails')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Pending_Emails" />
</ListItem><ListItem button onClick={() => history.push('/permission_role')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Permission_Role" />
</ListItem><ListItem button onClick={() => history.push('/permission_user')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Permission_User" />
</ListItem><ListItem button onClick={() => history.push('/permissions')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Permissions" />
</ListItem><ListItem button onClick={() => history.push('/profiles')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Profiles" />
</ListItem><ListItem button onClick={() => history.push('/recently_viewed_cars')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Recently_Viewed_Cars" />
</ListItem><ListItem button onClick={() => history.push('/rental_calculators')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Rental_Calculators" />
</ListItem><ListItem button onClick={() => history.push('/reports')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Reports" />
</ListItem><ListItem button onClick={() => history.push('/response_messages')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Response_Messages" />
</ListItem><ListItem button onClick={() => history.push('/review_messages')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Review_Messages" />
</ListItem><ListItem button onClick={() => history.push('/reviews')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Reviews" />
</ListItem><ListItem button onClick={() => history.push('/roles')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Roles" />
</ListItem><ListItem button onClick={() => history.push('/sent_emails')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Sent_Emails" />
</ListItem><ListItem button onClick={() => history.push('/social_connections')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Social_Connections" />
</ListItem><ListItem button onClick={() => history.push('/socials')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Socials" />
</ListItem><ListItem button onClick={() => history.push('/supports')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Supports" />
</ListItem><ListItem button onClick={() => history.push('/temp_messages')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Temp_Messages" />
</ListItem><ListItem button onClick={() => history.push('/temp_profile_datas')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Temp_Profile_Datas" />
</ListItem><ListItem button onClick={() => history.push('/temp_trips')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Temp_Trips" />
</ListItem><ListItem button onClick={() => history.push('/transaction_logs')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Transaction_Logs" />
</ListItem><ListItem button onClick={() => history.push('/trip_bill_histories')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Trip_Bill_Histories" />
</ListItem><ListItem button onClick={() => history.push('/trip_bills')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Trip_Bills" />
</ListItem><ListItem button onClick={() => history.push('/trip_cancellations')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Trip_Cancellations" />
</ListItem><ListItem button onClick={() => history.push('/trip_cars')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Trip_Cars" />
</ListItem><ListItem button onClick={() => history.push('/trip_histories')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Trip_Histories" />
</ListItem><ListItem button onClick={() => history.push('/trip_images')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Trip_Images" />
</ListItem><ListItem button onClick={() => history.push('/trip_notes')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Trip_Notes" />
</ListItem><ListItem button onClick={() => history.push('/trips')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Trips" />
</ListItem><ListItem button onClick={() => history.push('/user_availables')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="User_Availables" />
</ListItem><ListItem button onClick={() => history.push('/user_notes')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="User_Notes" />
</ListItem><ListItem button onClick={() => history.push('/users')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Users" />
</ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button onClick={() => history.push('/signup')}>
      <ListItemIcon>
        <LockOpenIcon />
      </ListItemIcon>
      <ListItemText primary="SignUp" />
    </ListItem>
    <ListItem button onClick={() => history.push('/')}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
   
  </div>
);

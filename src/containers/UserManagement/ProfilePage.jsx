import { Box, Tab, Typography, Tabs } from "@mui/material";
import EditProfile from "./EditProfile";
import React, { useState } from "react";
import LoginStyle from "../../styles/loginStyle";
import LoginAndSecurity from "./LoginAndSecurity";
import Notifications from "./Notifications";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ProfilePage = () => {
  const classes = LoginStyle();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event, index) => {
    setTabValue(index);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="General" className={classes.profileTabs} />
          <Tab label="Login & Security" className={classes.profileTabs} />
          <Tab label="Notifications" className={classes.profileTabs} />
        </Tabs>
      </Box>

      <Box>
        <TabPanel value={tabValue} index={0}>
          <EditProfile />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <LoginAndSecurity />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Notifications />
        </TabPanel>
      </Box>
    </>
  );
};

export default ProfilePage;

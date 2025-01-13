import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./components/TabPanel";
import Stack from "@mui/material/Stack";

import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const App = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Stack spacing={2} direction="column">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<PersonIcon />}
            iconPosition="start"
            label="Personal"
            {...a11yProps(0)}
          />
          <Tab
            icon={<GroupIcon />}
            iconPosition="start"
            label="Common"
            {...a11yProps(1)}
          />
          <Tab
            icon={<LunchDiningIcon />}
            iconPosition="start"
            label="Food"
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel tabValue={selectedTab} />
      </Stack>
    </Box>
  );
};

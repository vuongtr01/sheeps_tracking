import React, { useState } from "react";
import WebCam from "./components/WebCam";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const App = () => {
    const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Webcam" value="1" />
                    <Tab label="Item Two" value="2" />
                    <Tab label="Item Three" value="3" />
                </TabList>
            </Box>
            <Grid container>
                <Grid item xs={9}>
                    <Grid container direction="column">
                        <Grid item />
                        <Grid item>
                            <TabPanel value="1"><WebCam /></TabPanel>
                            <TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </Grid>
                        <Grid item />
                    </Grid>
                </Grid>
                <Grid item xs={3} />
            </Grid>
        </TabContext>
    </Box>
    )
}

export default App;

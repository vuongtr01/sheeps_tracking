import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import withStyles from '@mui/styles/withStyles';
import VideoInput from "./components/VideoInput";
import WebCam from "./components/WebCam";
import Statistic from "./components/Statistic";

const styles = () => ({
    statistic: {
        paddingTop: '32px',
    }
})

const App = (props) => {
    const { classes } = props;
    const [value, setValue] = useState('1');
    const [objectData, setObjectData] = useState([]);
    const [openStatistic, setOpenStatistic] = useState(false);
    const [imgSrc, setImgSrc] = useState([]);
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };
    return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Webcam" value="1" />
                    <Tab label="Video Input" value="2" />
                    <Tab label="Item Three" value="3" />
                </TabList>
            </Box>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="column">
                        <Grid item />
                        <Grid item>
                            <TabPanel value="1">
                                <WebCam
                                    setObjectData={setObjectData}
                                    objectData={objectData}
                                    setOpenStatistic={() => setOpenStatistic(!openStatistic)}
                                    setImgSrc={setImgSrc}
                                    imgSrc={imgSrc}
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                <VideoInput setObjectData={setObjectData} />
                            </TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </Grid>
                        <Grid item />
                    </Grid>
                </Grid>
                {openStatistic && (
                    <Grid item container className={classes.statistic}>
                        <Grid item xs={4} />
                        <Grid item xs={4}>
                            <Statistic data={objectData}/>
                        </Grid>
                        <Grid item xs={4} />
                    </Grid>
                )}
            </Grid>
        </TabContext>
    </Box>
    )
}

export default withStyles(styles)(App);

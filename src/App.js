import React  from "react";
import WebCam from "./components/WebCam";
import Grid from '@mui/material/Grid';

const App = () => {
  return (
    <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
            <Grid container direction="column">
                <Grid item />
                <Grid item>
                    <WebCam />
                </Grid>
                <Grid item />
            </Grid>
        </Grid>
        <Grid item xs={3} />
    </Grid>
  )
}

export default App;

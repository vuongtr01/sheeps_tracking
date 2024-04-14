import React, { useRef, useState, useEffect } from "react";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import withStyles from '@mui/styles/withStyles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const styles = () => ({
    video: {
        left: 0,
        right: 0,
        textAlign: "center",
        width: '500px',
        height: '500px',
    },
    actionButton: {
        paddingBottom: '16px',
    },
    div: {
        height: '500px',
    }
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

const VideoInput = (props) => {
    const {
        classes, setObjectData, setOpenStatistic,
    } = props;
    const [isTracking, setIsTracking] = useState(false);
    const videoRef = useRef(null);
    const [openVideo, setOpenVideo] = useState(false);
    const [videoSrc, setVideoSrc] = useState('');
    const handleClickVideo = () => {
        setOpenVideo(!openVideo);
        setOpenStatistic();
        setObjectData({});
    }
    const handleUpload = (event) => {
        setOpenStatistic()
        setOpenVideo(true);
        const file = event.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setVideoSrc(objectUrl);
        const formData = new FormData();
        formData.append("file", file);
        setIsTracking(true);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/upload_video',
            data: formData
          }).then((res) => {
            setIsTracking(false);
          }).catch(({ response }) => {
            response.data.errors.forEach((d) => {
                console.log(d);
                setIsTracking(false);
            });
          });;
    };

    useEffect(() => {
        if (isTracking) {
          const intervalId = setInterval(() => {
            console.log('running fetch: ');
            axios({
                method: 'get',
                url: 'http://127.0.0.1:5000/get_current_statistic',
              }).then((res) => {
                setObjectData(res.data.statistic_data);
              }).catch((error) => {
                console.log(error);
              });;
          }, 5000);
          return () => clearInterval(intervalId);
        }
      }, [isTracking]);

    return (
    <Grid container direction="column">
        {openVideo ? (
        <Grid container>
            <Grid item xs={2} container direction="column">
                <Grid item className={classes.actionButton}>
                    {openVideo ? (
                        <Button disabled={isTracking} variant="contained" onClick={handleClickVideo}>Stop Video</Button>
                    ) : (
                        <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" accept="video/*" onChange={handleUpload}/>
                        </Button>
                    )}
                    
                </Grid>
            </Grid>
            <Grid item xs={7} className={classes.webcamContainer}>
                <video ref={videoRef} muted={true} controls autoPlay className={classes.video}>
                    <source src={videoSrc} type="video/mp4" />
                </video>
            </Grid>
            {isTracking && (
                <Grid item xs={3} className={classes.webcamContainer}>
                    <Typography variant="h4" gutterBottom>
                        Is Tracking
                    </Typography>
                </Grid>
            )}
        </Grid>
        ) : (
            <Grid item>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" accept="video/*" onChange={handleUpload}/>
                </Button>
            </Grid>
        )}
    </Grid>
    );
}

export default withStyles(styles)(VideoInput);

import React, { useRef, useState, useEffect } from "react";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocossd from "@tensorflow-models/coco-ssd";
import DrawRect from "./helpers/DrawRect";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import withStyles from '@mui/styles/withStyles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const styles = () => ({
    video: {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9,
        width: '500px',
        height: '500px',
    },
    canvas: {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 8,
        width: '500px',
        height: '500px',
    },
    cameraContainer: {
        position: "relative",
    },
    actionButton: {
        paddingBottom: '16px',
    },
    webcamContainer: {
        position: "relative",
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
    console.log(setObjectData);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [openVideo, setOpenVideo] = useState(false);
    const [videoSrc, setVideoSrc] = useState('');
    const runCoco = async () => {
        const net = await cocossd.load();
        setInterval(() => {
            detect(net);
        }, 1000);
    };
    const handleClickVideo = () => {
        setOpenVideo(!openVideo);
        setOpenStatistic();
        setObjectData([]);
    }
    const handleUpload = (event) => {
        const file = event.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setVideoSrc(objectUrl);
        console.log(objectUrl);
        if (videoRef.current) {
            videoRef.current.src = objectUrl;
            videoRef.current.play();
        }
        setOpenVideo(true);
        setOpenStatistic();
        setObjectData([]);
    };
    
    const detect = async (net) => {
        if (
            typeof videoRef.current !== "undefined" &&
            videoRef.current !== null
        ) {
            const video = videoRef.current;
            console.log(video);
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const obj = await net.detect(video);
            console.log(obj);
            setObjectData(obj);

            const ctx = canvasRef.current.getContext("2d");
            const canvasInfo = {
                top: canvasRef.current.getBoundingClientRect().top,
                left: canvasRef.current.getBoundingClientRect().left,
                right: canvasRef.current.getBoundingClientRect().right,
                bottom: canvasRef.current.getBoundingClientRect().bottom,
            }
            DrawRect(obj, ctx, canvasInfo);
        }
    };

    useEffect(() => {
        runCoco();
    }, []);

    return (
    <Grid container direction="column">
        {openVideo ? (
        <Grid container>
            <Grid item xs={2} container direction="column">
                <Grid item className={classes.actionButton}>
                    {openVideo ? (
                        <Button variant="contained" onClick={handleClickVideo}>Stop Video</Button>
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
                <>
                    <video ref={videoRef} muted={true} controls autoPlay className={classes.video}>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                    <canvas
                        ref={canvasRef}
                        className={classes.canvas}
                    />
                    <div className={classes.div} />
                </>
            </Grid>
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

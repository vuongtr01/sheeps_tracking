import React, { useRef, useEffect, useState } from "react";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import DrawRect from "./helpers/DrawRect";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import withStyles from '@mui/styles/withStyles';

const styles = () => ({
    webcam: {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9,
    },
    canvas: {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 8,
    },
    cameraContainer: {
        position: "relative",
    }
});

const WebCam = (props) => {
    const { classes, setObjectData, setOpenStatistic } = props;
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [openCamera, setOpenCamera] = useState(false);
    const handleClickCamera = () => {
        setOpenCamera(!openCamera);
        setOpenStatistic();
        setObjectData([]);
    }
    const runCoco = async () => {
    const net = await cocossd.load();
    setInterval(() => {
        detect(net);
    }, 1000);
    };

    const detect = async (net) => {
    if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    ) {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const obj = await net.detect(video);
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
        {openCamera ? (
        <Grid container>
            <Grid item xs={4}>
                <Button variant="contained" onClick={handleClickCamera}>Stop Camera</Button>
            </Grid>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={6}>
                <>
                    <Webcam
                        ref={webcamRef}
                        muted={true}
                        className={classes.webcam}
                    />

                    <canvas
                        ref={canvasRef}
                        className={classes.canvas}
                    />
                </>
            </Grid>
        </Grid>
        ) : (
            <Grid item>
                <Button variant="contained" onClick={handleClickCamera}>Open Camera</Button>
            </Grid>
        )}
    </Grid>
    );
}

export default withStyles(styles)(WebCam);

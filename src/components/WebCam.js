import React, { useRef, useEffect } from "react";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import DrawRect from "./helpers/DrawRect";
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
        width: "100vw",
        height: "100vh"
    },
    canvas: {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 8,
        width: "100vw",
        height: "100vh"
    }
});

const WebCam = (props) => {
    const { classes } = props;
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // Main function
    const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
        detect(net);
    }, 10);
    };

    const detect = async (net) => {
    // Check data is available
    if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make Detections
        const obj = await net.detect(video);

        // Draw mesh
        const ctx = canvasRef.current.getContext("2d");
        DrawRect(obj, ctx);
    }
    };

    useEffect(() => {
    runCoco();
    }, []);

    return (
    <div className="container">
        <Webcam
        ref={webcamRef}
        muted={true}
        className={classes.webcam}
        />

        <canvas
        ref={canvasRef}
        className={classes.canvas}
        />
    </div>
    );
}

export default withStyles(styles)(WebCam);

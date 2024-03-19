const DrawRect = (detections, ctx, canvasPosition) => {
    // Loop through each prediction
  
    detections.forEach((prediction) => {
        // Extract boxes and classes
        const [x, y, width, height] = prediction["bbox"];
        const {
            left, right, top, bottom,
        } = canvasPosition;
        console.log(canvasPosition);
        const text = prediction["class"];
        console.log('predict');
        console.log(prediction["bbox"]);
        // Set styling
        const color = Math.floor(Math.random() * 16777215).toString(16);
        ctx.strokeStyle = "#" + color;
        ctx.font = "18px Arial";

        // Draw rectangles and text
        ctx.beginPath();
        ctx.fillStyle = "#" + color;
        ctx.fillText(text, x, y);
        const rectX = (left <= x <= right) ? x : left;
        const rectY = (top <= y <= bottom) ? y : top;
        const rectWidth = rectX + width > right ? right - rectX : width;
        const rectHeight = rectY + height > bottom ? bottom - rectY : height;
        ctx.rect(
            rectX,
            rectY,
            rectWidth,
            rectHeight,
        );
        ctx.stroke();

        if (prediction.class === "car") {
        }
    });
};

export default DrawRect;

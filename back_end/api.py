import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import ultralytics
from ultralytics import YOLO
from distance_calculation import DistanceCalculation
from sheep_statistic import SheepStatistic
import time
import os

app = Flask(__name__)
CORS(app)
my_statistic = SheepStatistic()

@app.route('/upload_video', methods=['POST'])
def tracking():
    print(request.files)
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']

    video = cv2.VideoCapture(file.filename) 
    model = YOLO('best.pt')
    start_time = time.time()
    while True:
        ret, frame = video.read()

        if not ret:
            break

        result = model.track(source=frame, project='./result' , tracker="bytetrack.yaml", mode="track", conf=0.5)
        boxes = result[0].boxes
        for index, b in enumerate(boxes):
            my_statistic.update_coordinate(index, b.xyxy.tolist()[0])
        
        current_time = time.time()
        if current_time - start_time >= 10:
            my_statistic.update_statistic()
            start_time = current_time  # Reset the start ti
        
    my_statistic.reset()
    return  jsonify({'statistic_data': my_statistic.get_moved_distance()}), 200

@app.route('/get_current_statistic')
def get_current_statistic():
    return  jsonify({'statistic_data': my_statistic.get_current_moved_distance()}), 200
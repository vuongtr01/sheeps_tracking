import time
from flask import Flask
from flask_cors import CORS
import cv2
import ultralytics
from ultralytics import YOLO
from distance_calculation import DistanceCalculation
from sheep_statistic import SheepStatistic
import time

app = Flask(__name__)
CORS(app)
my_statistic = SheepStatistic()

@app.route('/time')
def get_current_time():
    video = cv2.VideoCapture('sheeps_30sec.mp4')
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
        
    print(my_statistic.get_moved_distance())
    return {'time': time.time()}
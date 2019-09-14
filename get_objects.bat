del "C:\Users\James Jiang\Documents\HTN2019\tmp\image.jpg"
ffmpeg -f dshow -i "video=Logitech HD Webcam C270" -frames:v 1 tmp/image.jpg
python get_objects.py

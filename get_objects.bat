del "C:\Users\James Jiang\Documents\HTN2019\tmp\image.jpg"
ffmpeg -f dshow -i "video=USB Video Device" -frames:v 1 tmp/image.jpg
python get_objects.py

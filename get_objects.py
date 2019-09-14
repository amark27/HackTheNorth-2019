from google.cloud import vision

client = vision.ImageAnnotatorClient()

path = "tmp/image.jpg"
with open(path, "rb") as image_file:
    content = image_file.read()
image = vision.types.Image(content=content)

objects = client.object_localization(image=image).localized_object_annotations
for object_ in objects:
    print(object_.name)

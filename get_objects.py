from google.cloud import vision
import db

client = vision.ImageAnnotatorClient()

path = "tmp/image.jpg"
with open(path, "rb") as image_file:
    content = image_file.read()
image = vision.types.Image(content=content)

objects = client.object_localization(image=image).localized_object_annotations
object_names = [*map(lambda i: i.name, objects)]
doc_ref = db.db.collection(u"collection").document(u"document")
doc_ref.set({u"objects": object_names})

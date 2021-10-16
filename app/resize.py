from PIL import Image
import os

files = os.listdir('.')
for file in files:
    if(file != "white.png"):
        continue;

    img_path = "./"+file;
    img = Image.open(img_path)     # puts our image to the buffer of the PIL.Image object

    width, height = img.size
    asp_rat = width/height

    # Enter new width (in pixels)
    new_width = 500

    # Enter new height (in pixels)
    new_height = 500

    new_rat = new_width/new_height

    if (new_rat == asp_rat):
        img = img.resize((new_width, new_height), Image.ANTIALIAS)

    # adjusts the height to match the width
    # NOTE: if you want to adjust the width to the height, instead ->
    # uncomment the second line (new_width) and comment the first one (new_height)
    else:
        #new_height = round(new_width / asp_rat)
        #new_width = round(new_height * asp_rat)
        img = img.resize((new_width, new_height), Image.ANTIALIAS)

    # usage: resize((x,y), resample)
    # resample filter -> PIL.Image.BILINEAR, PIL.Image.NEAREST (default), PIL.Image.BICUBIC, etc..
    # https://pillow.readthedocs.io/en/3.1.x/reference/Image.html#PIL.Image.Image.resize

    # Enter the name under which you would like to save the new image
    renamed = img_path[2:]
    img.save(renamed)

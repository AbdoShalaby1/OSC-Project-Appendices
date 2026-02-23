import PIL.Image
import io

# 1. The "Monkey Patches" for Python 3.13 compatibility
if not hasattr(PIL.Image, 'ANTIALIAS'):
    PIL.Image.ANTIALIAS = PIL.Image.LANCZOS
if not hasattr(PIL.Image, 'CUBIC'):
    PIL.Image.CUBIC = PIL.Image.BICUBIC

PIL.Image.MAX_IMAGE_PIXELS = 300000000
import deepzoom

# 2. Configuration
SOURCE_FILE = "16kworld.png" # Make sure this file is in the same folder!
DESTINATION = "map.dzi"

# 3. The Workaround: Open the image manually to avoid the URLError

print(f"Opening {SOURCE_FILE} manually...")
source_img = PIL.Image.open(SOURCE_FILE)

# Initialize Creator
creator = deepzoom.ImageCreator(
    tile_size=256,
    tile_overlap=1,
    tile_format="jpg", # Matches your source
    image_quality=1.0,
    resize_filter="bicubic"
)

# 4. Bypass the library's internal 'safe_open' by injecting our image
print("Slicing image... this may take a minute for a 16k file.")
creator.create(source_img, DESTINATION) 

print(f"Success! Created {DESTINATION} and map_files folder.")

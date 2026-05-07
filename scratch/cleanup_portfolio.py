import json
import re

file_path = r'c:\xamp\htdocs\site_portfolio\js\portfolio-data.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the array content
# Match from 'const portfolioData = [' to the last '];'
match = re.search(r'const portfolioData = \[(.*)\];\s*function', content, re.DOTALL)
if not match:
    print("Could not find portfolioData array")
    exit(1)

array_str = match.group(1)

# Try to parse as JSON by adding brackets and fixing some formatting if needed
# The data is almost JSON but has unquoted keys sometimes? No, they look quoted.
# However, it might have trailing commas.
# Let's try to parse each object separately.

# Find objects { ... }
objects = []
# This is a bit naive but might work for this specific file structure
object_matches = re.finditer(r'\{[^{}]*\}', array_str)
for m in object_matches:
    obj_text = m.group(0)
    try:
        # Replace unquoted keys with quoted keys if any
        # Actually in the file they are quoted: "id": 1
        # But there might be trailing commas in objects
        obj_text = re.sub(r',\s*\}', '}', obj_text)
        obj = json.loads(obj_text)
        objects.append(obj)
    except Exception as e:
        print(f"Error parsing object: {obj_text}\n{e}")

# Deduplicate by imagePath
seen_paths = set()
unique_objects = []
for obj in objects:
    path = obj.get('imagePath')
    if path and path not in seen_paths:
        seen_paths.add(path)
        unique_objects.append(obj)
    elif not path: # Keep objects without path if any
        unique_objects.append(obj)

# Rebuild the file
new_array_str = json.dumps(unique_objects, indent=4, ensure_ascii=False)
# Fix formatting to match the original style (double spaces after colons, etc. - though not strictly necessary)
# original: "id":  1,
new_array_str = new_array_str.replace('": ', '":  ')

# Reconstruct the whole file content
header = content[:match.start()]
footer = content[match.end()-8:] # keep the 'function ...' part

new_content = f"const portfolioData = {new_array_str};\n\n{footer}"

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Successfully deduplicated. Original: {len(objects)}, Unique: {len(unique_objects)}")

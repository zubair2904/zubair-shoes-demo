import os
import re

base_dir = r'c:\Users\DELL\Desktop\stepup-shoes'
html_files = [f for f in os.listdir(base_dir) if f.endswith('.html')]

for filename in html_files:
    filepath = os.path.join(base_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace href="#" with something safe
    content = content.replace('href="#"', 'href="javascript:void(0)"')

    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
print('Fixed href=# mistakes.')

import os
import re

base_dir = r'c:\Users\DELL\Desktop\stepup-shoes'
html_files = [f for f in os.listdir(base_dir) if f.endswith('.html')]

# We'll inject AOS CSS and JS into every HTML file
aos_css = '<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">'
aos_js = '<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n<script>AOS.init({duration: 800, once: true});</script>'

for filename in html_files:
    filepath = os.path.join(base_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Inject AOS CSS before </head>
    if 'aos.css' not in content:
        content = content.replace('</head>', f'    {aos_css}\n</head>')
    
    # Inject AOS JS before </body>
    if 'aos.js' not in content:
        content = content.replace('</body>', f'{aos_js}\n</body>')
    
    # Add aos tags to specific sections where applicable
    if filename == 'index.html':
        content = content.replace('class="hero-content"', 'class="hero-content" data-aos="fade-right"')
        content = content.replace('class="hero-image"', 'class="hero-image" data-aos="fade-left"')
        content = content.replace('class="category-card"', 'class="category-card" data-aos="zoom-in"')
        content = content.replace('class="feature-card"', 'class="feature-card" data-aos="flip-up"')

    if filename == 'contact.html':
        content = content.replace('class="contact-info-panel"', 'class="contact-info-panel" data-aos="fade-right"')
        content = content.replace('class="contact-form-panel"', 'class="contact-form-panel" data-aos="fade-left"')
        
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
print('Injected AOS into all files.')

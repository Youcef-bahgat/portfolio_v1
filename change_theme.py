import os
import re

css_path = r'D:\AI\portfolio_new\style.css'
js_path = r'D:\AI\portfolio_new\script.js'

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        # Case insensitive regex replace
        content = re.sub(old, new, content, flags=re.IGNORECASE)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Styling replacements for a premium Blue/Purple/Pink tech theme
css_replacements = [
    # Hex
    (r'222831', '0f172a'),          # --dark
    (r'393E46', '1e293b'),          # --gray
    (r'00ADB5', '3b82f6'),          # --primary (Blue 500)
    (r'00d4ff', '8b5cf6'),          # --accent (Purple 500)
    (r'80deea', 'ec4899'),          # --accent2 (Pink 500)
    
    # RGB variants
    (r'34,\s*40,\s*49', '15, 23, 42'),      # rgb for dark
    (r'57,\s*62,\s*70', '30, 41, 59'),      # rgb for gray
    (r'0,\s*173,\s*181', '59, 130, 246'),   # rgb for primary
]

js_replacements = [
    (r'00ADB5', '3b82f6'),
    (r'0,\s*173,\s*181', '59, 130, 246'),
    (r'"speed":\s*3', '"speed": 4'),
    (r'"distance":\s*150', '"distance": 180'),
    (r'"opacity":\s*0\.4', '"opacity": 0.6'),
]

replace_in_file(css_path, css_replacements)
replace_in_file(js_path, js_replacements)

# Add an extra "active" class feeling to animation speeds in CSS
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Make transitions slightly faster and snappier
css_content = re.sub(r'all 0\.4s', 'all 0.3s', css_content)
css_content = re.sub(r'0\.6s ease', '0.45s cubic-bezier(0.2, 0.8, 0.2, 1)', css_content)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Theme updated to Professional & Active successfully.")

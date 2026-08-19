import os

file_path = 'src/components/site/vja/VjaHero.tsx'
with open(file_path, 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'import vjaHeroReel from "@/assets/vja-hero-reel-optimized.mp4.asset.json";' in line:
        new_lines.append('import vjaHeroReel from "@/assets/vja-hero-reel.mp4.asset.json";\n')
    else:
        new_lines.append(line)

with open(file_path, 'w') as f:
    f.writelines(new_lines)

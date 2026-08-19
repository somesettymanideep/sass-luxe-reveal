import json
import os
from pathlib import Path

def fix_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # 1. Update imports to use the correct optimized asset
    content = content.replace('vja-hero-reel-optimized.mp4.asset.json', 'vja-hero-reel.mp4.asset.json')
    
    # 2. Fix the video tag implementation if it's using the self-closing src prop which can be buggy in some browsers with asset pointers
    # Actually, the main issue is usually the readyState 0 (HAVE_NOTHING) and Error 4 (MEDIA_ERR_SRC_NOT_SUPPORTED)
    # This often happens if the asset URL is relative and needs to be absolute or if the source tag is missing a type.
    
    with open(file_path, 'w') as f:
        f.write(content)

# Update VjaHero to use the known-working asset ID (8e679fdc-3318-4612-91f5-76a64119ab50)
# The "optimized" one might have a mismatch in the project_id or something similar.
fix_file('src/components/site/vja/VjaHero.tsx')

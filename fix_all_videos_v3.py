import os

def fix_video_tags(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Target specific video tag patterns found in BranchSections and HomeTransformations
    old_video = '''            <video
              src={c.src}
              poster={c.poster}
              muted
              loop
              playsInline
              preload="auto"'''
    
    new_video = '''            <video
              poster={c.poster}
              muted
              loop
              playsInline
              preload="auto"'''
              
    if old_video in content:
        content = content.replace(old_video, new_video)
        # Now fix the closing part to add the source tag
        content = content.replace('group-hover:scale-105"\n            />', 
                                 'group-hover:scale-105"\n            >\n              <source src={c.src} type="video/mp4" />\n            </video>')
    
    with open(file_path, 'w') as f:
        f.write(content)

fix_video_tags('src/components/site/branch/BranchSections.tsx')
fix_video_tags('src/components/site/HomeTransformations.tsx')

# VjaHero cleanup (ensuring no double tags)
vja_hero_path = 'src/components/site/vja/VjaHero.tsx'
if os.path.exists(vja_hero_path):
    with open(vja_hero_path, 'r') as f:
        content = f.read()
    
    # Check if we messed up the tags
    # VjaHero used vjaHeroReel.url and vjaHeroReel was from a specific import
    # The previous fix might have left fragments
    if '<source src={vjaHeroReel.url} type="video/mp4" />' in content:
        # Standardize it
        lines = content.split('\n')
        new_lines = []
        skip = False
        for line in lines:
            if '<video' in line:
                new_lines.append('            <video')
                new_lines.append('              autoPlay')
                new_lines.append('              muted')
                new_lines.append('              loop')
                new_lines.append('              playsInline')
                new_lines.append('              preload="auto"')
                new_lines.append('              className="size-full object-cover"')
                new_lines.append('            >')
                new_lines.append('              <source src={vjaHeroReel.url} type="video/mp4" />')
                new_lines.append('            </video>')
                skip = True
            elif '</video>' in line:
                skip = False
                continue
            elif skip:
                if 'src=' in line or 'autoPlay' in line or 'muted' in line or 'loop' in line or 'playsInline' in line or 'preload' in line or 'className' in line or 'source src' in line:
                    continue
                else:
                    new_lines.append(line)
            else:
                new_lines.append(line)
        
        # This approach is a bit risky if multiple videos, but VjaHero only has one.
        # Actually, let's just do a clean write for VjaHero
        pass 

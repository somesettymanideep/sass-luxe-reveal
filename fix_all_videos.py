import os
import json

def update_file(file_path, old_text, new_text):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r') as f:
        content = f.read()
    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(file_path, 'w') as f:
            f.write(content)

# Update BranchHero to use source tags and correct types
branch_hero_path = 'src/components/site/branch/BranchHero.tsx'
if os.path.exists(branch_hero_path):
    with open(branch_hero_path, 'r') as f:
        content = f.read()
    
    # Replace video tag with one using source
    old_video = '''            <video
              ref={videoRef}
              src={reel}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={`SASS Hair & Beauty ${branch.city} salon showreel`}
              className="mx-auto aspect-9/16 w-full max-w-[26rem] object-cover"
            />'''
    
    new_video = '''            <video
              ref={videoRef}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={`SASS Hair & Beauty ${branch.city} salon showreel`}
              className="mx-auto aspect-9/16 w-full max-w-[26rem] object-cover"
            >
              <source src={reel} type="video/mp4" />
            </video>'''
    
    content = content.replace(old_video, new_video)
    with open(branch_hero_path, 'w') as f:
        f.write(content)

# Update VjaSections to use source tags for transformations
vja_sections_path = 'src/components/site/vja/VjaSections.tsx'
if os.path.exists(vja_sections_path):
    with open(vja_sections_path, 'r') as f:
        content = f.read()
    
    # Generic replacement for transformation videos in the slider
    # Need to be careful not to break the JSX
    # I'll just look for src={video.url} in a video tag
    content = content.replace('src={video.url}', '')
    content = content.replace('preload="auto"', 'preload="auto"> <source src={video.url} type="video/mp4" /> </video>')
    # This might double-close if not careful, better to be specific if I had the full code
    # Re-reading VjaSections first to be safe

import os

def fix_video_tags(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Replace self-closing video tags with source tags for better cross-browser compatibility
    # and to resolve MEDIA_ERR_SRC_NOT_SUPPORTED errors with asset pointers.
    
    # Pattern 1: Transformations (video.url)
    old_video_transform = '''            <video
              src={video.url}
              loop
              muted
              playsInline
              preload="auto"
              className="size-full object-cover"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />'''
    
    new_video_transform = '''            <video
              loop
              muted
              playsInline
              preload="auto"
              className="size-full object-cover"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            >
              <source src={video.url} type="video/mp4" />
            </video>'''
            
    content = content.replace(old_video_transform, new_video_transform)
    
    with open(file_path, 'w') as f:
        f.write(content)

fix_video_tags('src/components/site/branch/BranchSections.tsx')
fix_video_tags('src/components/site/HomeTransformations.tsx')

# Ensure VjaHero is using the working asset and source tag
vja_hero_path = 'src/components/site/vja/VjaHero.tsx'
if os.path.exists(vja_hero_path):
    with open(vja_hero_path, 'r') as f:
        content = f.read()
    
    # 1. Update import to working asset
    content = content.replace('import vjaHeroReel from "@/assets/vja-hero-reel-optimized.mp4.asset.json";', 
                             'import vjaHeroReel from "@/assets/vja-hero-reel.mp4.asset.json";')
    
    # 2. Ensure it uses source tag
    if '<source src={vjaHeroReel.url} type="video/mp4" />' not in content:
        content = content.replace('src={vjaHeroReel.url}', '')
        content = content.replace('preload="auto"', 'preload="auto">\n              <source src={vjaHeroReel.url} type="video/mp4" />\n            </video>')
        # Remove the extra self-closing tag if it exists
        content = content.replace('className="size-full object-cover"\n            />', 'className="size-full object-cover"')
    
    with open(vja_hero_path, 'w') as f:
        f.write(content)

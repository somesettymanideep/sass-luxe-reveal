import os
import re

components_dir = "src/components/site"
for root, dirs, files in os.walk(components_dir):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            path = os.path.join(root, file)
            with open(path, "r") as f:
                content = f.read()
            
            # Find all imports ending with ?url
            urls = re.findall(r"import\s+(\w+)\s+from\s+[\"\'](@/assets/[^\"\']+)\?url[\"\']", content)
            if not urls:
                continue
            
            modified = False
            for var_name, asset_path in urls:
                # Check if asset_path.asset.json exists
                asset_rel = asset_path.replace("@/assets/", "src/assets/")
                json_path = asset_rel + ".asset.json"
                
                if os.path.exists(json_path):
                    print(f"Fixing {var_name} in {path} (using {json_path})")
                    # Replace import
                    content = content.replace(f'from "{asset_path}?url"', f'from "{asset_path}.asset.json"')
                    content = content.replace(f"from '{asset_path}?url'", f"from '{asset_path}.asset.json'")
                    
                    # Common patterns: src={var}, poster={var}, image: var, img: var, icon: var
                    patterns = [
                        (f"src={{{var_name}}}", f"src={{{var_name}.url}}"),
                        (f"poster={{{var_name}}}", f"poster={{{var_name}.url}}"),
                        (f"image: {var_name}", f"image: {var_name}.url"),
                        (f"img: {var_name}", f"img: {var_name}.url"),
                        (f"icon: {var_name}", f"icon: {var_name}.url"),
                        (f"{{{var_name}}}", f"{{{var_name}.url}}"), 
                        (f"image={{{var_name}}}", f"image={{{var_name}.url}}"),
                        (f"img={{{var_name}}}", f"img={{{var_name}.url}}"),
                        (f"url={{{var_name}}}", f"url={{{var_name}.url}}"),
                    ]
                    
                    for old, new in patterns:
                        if old in content:
                            content = content.replace(old, new)
                            modified = True
            
            if modified:
                with open(path, "w") as f:
                    f.write(content)

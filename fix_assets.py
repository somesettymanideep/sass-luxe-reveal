import os
import json
import re

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all imports from @/assets/ ending in .asset.json
    # Matches: import logo from "@/assets/sass-logo-new.png.asset.json";
    pattern = r'import\s+(\w+)\s+from\s+["\']@/assets/([^"\']+)\.asset\.json["\']'
    
    matches = re.finditer(pattern, content)
    replacements = []
    
    for match in matches:
        var_name = match.group(1)
        asset_rel_path = match.group(2)
        full_json_path = os.path.join('src', 'assets', asset_rel_path + '.asset.json')
        
        if os.path.exists(full_json_path):
            try:
                with open(full_json_path, 'r') as jf:
                    data = json.load(jf)
                    url = data.get('url')
                    if url:
                        # Prepare the replacement
                        # We want to replace the import and also usages of var_name.url
                        # Since we can't easily replace all usages without risk, 
                        # we'll just define the variable as an object with a url property.
                        old_import = match.group(0)
                        new_line = f'const {var_name} = {{ url: "{url}" }};'
                        replacements.append((old_import, new_line))
            except Exception as e:
                print(f"Error reading {full_json_path}: {e}")

    if not replacements:
        return

    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file_path}")

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                fix_file(os.path.join(root, file))

if __name__ == "__main__":
    main()

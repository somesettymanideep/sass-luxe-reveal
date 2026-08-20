import os
import json
import re

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match: import var from "@/assets/name.ext.asset.json";
    # Match: import var from "../assets/name.ext.asset.json";
    pattern = r'import\s+(\w+)\s+from\s+["\'](\.?\.?/@/assets/[^"\']+)\.asset\.json["\']'
    
    matches = list(re.finditer(pattern, content))
    if not matches:
        return

    replacements = []
    for match in matches:
        var_name = match.group(1)
        import_path = match.group(2)
        
        # Resolve absolute path for the JSON file
        # The path in code is often @/assets/... or ../assets/...
        # We know assets are in src/assets
        rel_asset_path = import_path.split('assets/')[-1]
        full_json_path = os.path.join('src', 'assets', rel_asset_path + '.asset.json')
        
        if os.path.exists(full_json_path):
            try:
                with open(full_json_path, 'r') as jf:
                    data = json.load(jf)
                    url = data.get('url')
                    if url:
                        replacements.append((match.group(0), f'const {var_name} = {{ url: "{url}" }};'))
            except Exception as e:
                print(f"Error reading {full_json_path}: {e}")

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

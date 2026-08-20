import os
import json
import re

def fix_file(file_path):
    if file_path == 'src/lib/assets.ts': return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the previous fix pattern and update it
    # Pattern: const var = { url: "/__l5e/..." };;
    pattern = r'const\s+(\w+)\s+=\s+\{\s*url:\s*"(/__l5e/[^"]+)"\s*\};+'
    
    new_content = content
    has_helper = 'import { getAssetUrl }' in content
    
    matches = list(re.finditer(pattern, new_content))
    if not matches:
        return

    replacements = []
    for match in matches:
        var_name = match.group(1)
        url = match.group(2)
        replacements.append((match.group(0), f'const {var_name} = {{ url: getAssetUrl("{url}") }};'))

    for old, new in replacements:
        new_content = new_content.replace(old, new)
    
    if replacements and not has_helper:
        lines = new_content.split('\n')
        last_import = 0
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import = i
        lines.insert(last_import + 1, 'import { getAssetUrl } from "@/lib/assets";')
        new_content = '\n'.join(lines)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                fix_file(os.path.join(root, file))

if __name__ == "__main__":
    main()

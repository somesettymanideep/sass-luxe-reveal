import os
import re

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find URLs starting with /__l5e/ and prepend the base path if not present
    # Matches: url: "/__l5e/assets-v1/..."
    # Replacement: url: "/sass-luxe-reveal/__l5e/assets-v1/..."
    
    pattern = r'url:\s*"(/__l5e/assets-v1/[^"]+)"'
    
    new_content = re.sub(pattern, r'url: "/sass-luxe-reveal\1"', content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed URLs in {file_path}")

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                fix_file(os.path.join(root, file))

if __name__ == "__main__":
    main()

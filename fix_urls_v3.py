import os
import re

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Revert the sass-luxe-reveal prefix for l5e assets
    # We want them to be relative to the root for the dev server, 
    # but we'll use a dynamic approach or just revert to root-relative
    # because the dev server serves them at /__l5e/...
    
    new_content = content.replace('url: "/sass-luxe-reveal/__l5e/', 'url: "/__l5e/')

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Reverted URLs in {file_path}")

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                fix_file(os.path.join(root, file))

if __name__ == "__main__":
    main()

from pathlib import Path

# Get the Path object for the current working directory
current_directory = Path.cwd()

# Iterate over the contents of the directory
print(f"Contents of '{current_directory}':")
for item in current_directory.iterdir():
    if " " in item.name:
        orig_file = item.name
        new_file = orig_file.replace(" ", "_")
        print(f"Renaming '{orig_file}' to '{new_file}'")
        item.rename(item.parent / new_file)

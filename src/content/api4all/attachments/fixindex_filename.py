with open("../index.md", "r") as file:
    content = file.read()

new_content = []
for line in content.splitlines():
    if "Pasted%20image%20" in line:
        line = line.replace("Pasted%20image%20", "Pasted_image_")

    new_content.append(line)

with open("../new_index.md", "w") as file:
    file.write("\n".join(new_content))

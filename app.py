from flask import Flask, render_template
import os
import json
import glob

app = Flask(__name__)


def load_experience_data(folder_path):
    """Load JSON files from a folder and return their data as a list."""
    data_list = []
    for file_path in glob.glob(os.path.join(folder_path, "*.json")):
        with open(file_path, "r") as file:
            data = json.load(file)
            data_list.append(data)
    return data_list


def load_project_data(projects_folder):
    """Load project data from folders and include image paths."""
    project_data = []
    unique_categories = set()

    for project_name in os.listdir(projects_folder):
        project_path = os.path.join(projects_folder, project_name)
        if os.path.isdir(project_path):
            json_path = os.path.join(project_path, "data.json")
            image_path = find_image_file(project_path)

            if os.path.exists(json_path):
                with open(json_path, "r") as file:
                    data = json.load(file)
                    data["image"] = image_path or "/static/images/default.jpg"
                    project_data.append(data)

                    # Add category to unique categories if it exists in data
                    category = data.get("category", "Uncategorized")
                    unique_categories.add(category)

    return project_data, sorted(unique_categories)


def load_certificate_data(certificates_folder):
    """Load project data from folders and include image paths."""
    certificate_data = []

    for certificate_name in os.listdir(certificates_folder):
        certificate_path = os.path.join(certificates_folder, certificate_name)
        if os.path.isdir(certificate_path):
            json_path = os.path.join(certificate_path, "data.json")
            image_path = find_image_file(certificate_path)

            if os.path.exists(json_path):
                with open(json_path, "r") as file:
                    data = json.load(file)
                    data["image"] = image_path or "/static/images/default.jpg"
                    certificate_data.append(data)
    return certificate_data


def find_image_file(folder_path):
    """Find an image file with common extensions in a folder."""
    for ext in ["jpg", "png", "jpeg", "gif"]:
        found_images = glob.glob(os.path.join(folder_path, f"*.{ext}"))
        if found_images:
            return found_images[0].replace("\\", "/")
    return None


@app.route("/", methods=["GET", "POST"])
def home():
    experience_folder = os.path.join("static", "json", "experience")
    projects_folder = os.path.join("static", "json", "projects")
    certificates_folder = os.path.join("static", "json", "certificates")
    experience_content = load_experience_data(experience_folder)
    certificate_content = load_certificate_data(certificates_folder)

    project_content, unique_categories = [], []

    # Check if the projects folder exists before trying to read it
    if os.path.exists(projects_folder):
        project_content, unique_categories = load_project_data(projects_folder)
    else:
        print(f"Warning: Projects folder '{projects_folder}' does not exist.")

    return render_template(
        "index.html",
        experience_content=experience_content,
        project_content=project_content,
        categories=unique_categories,
        certificate_content=certificate_content,
    )


if __name__ == "__main__":
    app.run(debug=True)

# Online Recipe Application

## Description
The **Online Recipe Application** is a user-friendly web application that allows users to store, manage, and refer to their favorite recipes. Built with **React.js** and **JSON Server**, this app provides a seamless experience for users to create, update, delete, and categorize their recipes. Users can also search for recipes by keywords and enjoy a responsive design for optimal usage on any device.

## Features
- **User Authentication**: Secure login and registration for users to manage their recipes.
- **Recipe Management**: Create, read, update, and delete recipes easily.
- **Search Functionality**: Quickly search for recipes by name or ingredients.
- **Recipe Categories**: Classify recipes into categories such as Breakfast, Lunch, Dinner, Dessert, and Appetizer.
- **Image Integration**: Fetch recipe images using the Spoonacular API based on recipe names.
- **Responsive Design**: Optimized for various devices to ensure a smooth user experience.
- **Input Validation**: Prevent errors with validation on recipe input fields.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/online-recipe-app.git
2.	Navigate into the project directory:
bash
Copy code
cd online-recipe-app
3.	Install the dependencies:
bash
Copy code
npm install
4.	Start the JSON Server:
bash
Copy code
json-server --watch db.json --port 5000
5.	Start the development server:
bash
Copy code
npm start
6.	Open your browser and visit http://localhost:3000 to use the app.
Usage
•	Set Up an Account: Register a new account to start managing your recipes.
•	Login: Use your credentials to log in and access your saved recipes.
•	Add Recipes: Fill out the form to add new recipes with necessary details and images.
•	Search Recipes: Use the search input to find recipes by name or ingredients.
•	Manage Recipes: Edit or delete recipes as needed.
Configuration
•	Environment Variables: Set up your Spoonacular API key in the relevant file for fetching recipe images.
•	Database: The app uses db.json to store and manage recipe data locally via JSON Server.
Components
•	App: Main component that handles routing for login, registration, and the home page.
•	LoginPage: Component for user login functionality.
•	RegistrationPage: Component for new user registration.
•	HomePage: Displays the list of recipes and provides functionality for adding, editing, deleting, and searching recipes.
Contributing
Contributions are welcome! If you'd like to contribute:
1.	Fork the repository.
2.	Create a new branch for your feature or bugfix.
3.	Commit your changes and open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Contact
Created by Nkoebotse Elliot Sekgobela - feel free to contact me at elliotsekobela@gmail.com.

![recipe](https://github.com/user-attachments/assets/fd0cc4ff-0819-47d8-919f-e720ec27ba3c)
![recipe m](https://github.com/user-attachments/assets/036c8c2c-599b-4a47-aef3-ffa4124f7b76)

# Kwanpa
A smart health monitoring app
## About Kwanpa
Kwanpa is a smart health management system that enables users to track, manage, and improve their daily lifestyle habits. The system integrates with existing IoT-based health platforms, such as the Apple Health app or smart watch, to automatically collect real-time data including steps, sleep patterns, calories, and other vital health metrics. 

By combining this data with user-inputted lifestyle routines, the app generates personalized reminders, interactive health dashboards, and progress insights in a user-friendly manner. These insights are accessible not only to the user but also through a simplified dashboard for the user’s caregiver(s) and doctors, allowing them to monitor wellbeing and provide timely interventions - ultimately reducing emergency and referral cases in the long run. 


Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Local setup after cloning

After you clone the repository, follow these additional setup steps to get the project running locally:

1. Change into the project folder (if you didn't already):

	```sh
	cd <YOUR_PROJECT_NAME>
	```

2. Make sure you have Node.js installed (recommended: Node 18 or newer). Use a version manager such as nvm or n for easy switching.

3. If the app requires environment variables, create a `.env` file in the project root and add any required keys (your backend URL, API keys, etc.).

4. Install dependencies:

	```sh
	npm install
	```

5. Start the development server (hot-reload):

	```sh
	npm run dev
	```

6. Build for production:

	```sh
	npm run build
	```

7. Preview the production build locally:

	```sh
	npm run preview
	```

8. Lint the codebase:

	```sh
	npm run lint
	```

These scripts are defined in `package.json`: `dev`, `build`, `build:dev`, `preview`, and `lint`.


**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS




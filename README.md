# Harsh Jangid — Personal Portfolio

A responsive personal portfolio website showcasing my background, technical skills, projects, and interactive features. The website includes a live weather checker and an AI-powered portfolio chatbot integrated with the Groq API.

**Live Website:** [View Portfolio](https://portfolio-sandy-two-2h1yeodf5u.vercel.app)

## Overview

This portfolio serves as a central place to explore my work, learn about my technical interests, and access my project repositories. It is built with HTML, CSS, and vanilla JavaScript, with a Vercel serverless function handling AI chatbot requests.

The website uses a blue-and-gold visual theme, supports dark mode, and includes interactive features that work directly in the browser.

## Features

### Portfolio

- **About Section:** Introduction and profile image.
- **Skills Section:** Displays technical skills, including HTML, CSS, JavaScript, Python, C, and C++.
- **Projects Section:** Project descriptions, repository links, and a searchable project list.
- **Contact Section:** Email and GitHub links.
- **Responsive Layout:** Adapts the page layout to different screen sizes.
- **Dark Mode:** Switch between light and dark themes.
- **Smooth Navigation:** Navigate between page sections.
- **Dynamic Copyright Year:** Automatically updates the year in the footer.

### Live Weather Checker

- Search for a city to retrieve its current weather.
- Displays the temperature, weather description, and humidity.
- Handles common errors, including invalid city names, API errors, and network failures.

The weather checker uses the OpenWeather API.

### AI Portfolio Chatbot

- Answers questions about the portfolio, skills, projects, and background.
- Uses the Groq API to generate AI responses.
- Includes local greeting responses that do not require an AI API request.
- Sends portfolio information as context to help answer portfolio-related questions.
- Maintains a short conversation history for follow-up questions.
- Displays loading and error messages during requests.

The chatbot communicates with a Vercel serverless API endpoint. The Groq API key is stored as a server-side environment variable rather than being included in frontend JavaScript.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, layout, responsive design, and themes |
| JavaScript | Interactive features and frontend behavior |
| Groq API | AI-generated chatbot responses |
| OpenWeather API | Current weather information |
| Vercel Functions | Server-side chatbot endpoint |
| Git and GitHub | Version control and source code hosting |
| Vercel | Website hosting and deployment |

## Project Structure

```text
portfolio/
├── api/
│   └── chat.js             # Serverless chatbot endpoint
├── images/
│   └── profile.jpg         # Portfolio profile image
├── index.html              # Main webpage
├── style.css               # Main website styling
├── script.js               # Theme, weather, and page interactions
├── chatbot.css             # Chatbot styling
├── chatbot.js              # Chatbot frontend logic
├── .gitignore              # Excludes local and sensitive files
└── README.md               # Project documentation
```

This structure describes the main application files. Additional files may exist in the repository.

## Getting Started

### Prerequisites

- Git
- A modern web browser
- Node.js and npm for running the Vercel development environment
- A Groq API key for the AI chatbot
- An OpenWeather API key for the weather checker

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_NAME>
```

Replace the placeholders with your actual GitHub repository URL and directory name.

### 2. Install the Vercel CLI

```bash
npm install -g vercel
```

### 3. Configure environment variables

Create a local `.env` file in the project root for development:

```env
GROQ_API_KEY=your_groq_api_key
```

Replace the placeholder with your actual Groq API key. Do not commit this file to GitHub.

The chatbot backend reads the key from `process.env.GROQ_API_KEY`.

For local development, configure the variable in your terminal or local environment as appropriate. If using Vercel's local environment workflow, you can also use:

```bash
vercel env pull .env.local
```

This command requires the project to be linked to Vercel and the variable to be configured in the Vercel project.

### 4. Configure the weather API

The weather checker requires an OpenWeather API key. Configure it according to the implementation in `script.js`.

If the key is currently embedded in frontend JavaScript, understand that it is publicly visible to website visitors. Restrict it through the provider's available controls or move weather requests to a server-side endpoint if stronger key protection is required.

### 5. Run the project locally

From the project root, run:

```bash
vercel dev
```

Follow the CLI prompts to link the project if necessary. Open the local URL provided by the CLI.

Using Vercel's development environment allows the `/api/chat` serverless endpoint to run locally. Opening `index.html` directly through a `file://` URL will not run that backend endpoint.

## Deployment

The portfolio is deployed on Vercel.

**Live deployment:** [https://portfolio-sandy-two-2h1yeodf5u.vercel.app](https://portfolio-sandy-two-2h1yeodf5u.vercel.app)

To deploy your own copy:

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Configure the required environment variables in the Vercel project settings.
4. Deploy the application.
5. Test the portfolio, weather checker, and chatbot on the deployed URL.

### Required Vercel Environment Variable

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Authenticates server-side requests to the Groq API |

Add this variable under **Vercel → Project Settings → Environment Variables**. Enable it for the environments you intend to use, such as Production and Preview, then redeploy after making changes.

Do not use a public frontend variable for the Groq API key.

For a GitHub-connected Vercel project, pushes to the configured production branch can trigger automatic deployments.

## Security Notes

- Never commit API keys, passwords, or private environment files to GitHub.
- Keep `GROQ_API_KEY` on the server and access it through `process.env`.
- Ensure `.env` and `.env.local` are ignored by Git.
- Do not rely on `.gitignore` to remove secrets that were already committed.
- If an API key has been exposed publicly, rotate it through the provider.
- Public serverless endpoints can be abused. Consider adding rate limiting and usage controls to protect API quotas.
- Frontend API keys, including weather service keys, should be treated as visible to visitors.

## Customization

The main application files can be edited as follows:

| File | Responsibility |
|---|---|
| `index.html` | Page content, sections, and script references |
| `style.css` | Main layout, typography, colors, and theme styling |
| `script.js` | Theme switching, weather requests, project search, and general interactions |
| `chatbot.css` | Chatbot appearance and responsive styling |
| `chatbot.js` | Message rendering, conversation history, and requests to the backend |
| `api/chat.js` | Server-side AI request handling |
| `images/` | Profile image and other local image assets |
| `README.md` | Project documentation |

## Troubleshooting

### The chatbot is unavailable

- Confirm that `GROQ_API_KEY` is configured in the relevant Vercel environment.
- Check that `api/chat.js` exists in the project root's `api` directory.
- Inspect the browser's Network panel for errors from `/api/chat`.
- Check Vercel function logs for server-side errors.
- Verify that the selected Groq model is available to your account.

### The weather checker does not work

- Check the browser console and Network panel.
- Confirm that the OpenWeather API key is valid and active.
- Check whether the requested city name is valid.
- Review the API provider's usage limits.

### Changes do not appear on the live website

- Confirm that your changes have been committed and pushed to the correct branch.
- Check the deployment status in Vercel.
- Confirm that the latest deployment corresponds to the expected Git commit.
- Hard-refresh the browser to rule out cached frontend assets.

## Author

**Harsh Jangid**

- **GitHub:** [HARSH1-rgb](https://github.com/HARSH1-rgb)
- **Portfolio:** [Live Website](https://portfolio-sandy-two-2h1yeodf5u.vercel.app)
- **Email:** harhsjangid915@gmail.com

## License

No license has been specified for this project. Unless a license is added to the repository, others should not assume they have permission to reuse, modify, or redistribute the code.

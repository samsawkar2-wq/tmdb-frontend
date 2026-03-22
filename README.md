# MovieVerse - TMDB Frontend

MovieVerse is a dynamic, responsive frontend web application built using Vanilla JavaScript, HTML, and CSS. It utilizes the [TMDB (The Movie Database) API](https://developer.themoviedb.org/docs) to fetch and display the latest movies, TV shows, and trending entertainment content in a Netflix-style interface.

## 🌟 Features

- **Dynamic Hero Banner**: Auto-sliding banner showcasing top revenue movies with manual navigation controls.
- **Categorized Content**: Browse through curated lists such as:
  - Top Rated, Trending, New Releases, and Coming Soon Movies.
  - Airing Today, Popular, and Top Rated TV Shows.
- **Horizontal Scrolling**: Smooth horizontal scrolling for movie and TV show rows using custom navigational buttons.
- **Search Functionality**: A built-in search bar to quickly find specific movies or TV shows across the TMDB database.
- **Detailed Information Page**: Click on any movie or TV show card to view its high-quality poster, release date, rating, and description.
- **Responsive Design**: Fully responsive layout that adapts seamlessly to desktop, tablet, and mobile devices.
- **Interactive Navigation**: Fixed vertical sidebar for quick traversal between different sections.

## 🚀 Tech Stack

- **HTML5**: Structure and semantics.
- **CSS3**: Styling, animations, flexbox layout, gradient backgrounds, and responsive media queries.
- **Vanilla JavaScript (ES6+)**: DOM manipulation, event handling, and asynchronous `fetch` API requests.
- **Node.js & Express**: A backend proxy server to securely store the API key and forward requests.
- **TMDB API**: External REST API for fetching movie and TV show data.

## 🛠️ Getting Started

### Prerequisites
- Node.js installed on your machine.
- A modern web browser.
- A TMDB API Key.

### Installation & Setup

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <repository-url>
   ```

2. **Backend Setup**:
   Navigate to the backend directory, install dependencies, and setup your `.env` file:
   ```bash
   cd "tmdb frontend/backend"
   npm install
   ```
   Create a `.env` file inside the `backend` folder and add your TMDB API Key:
   ```env
   TMDB_API_KEY=your_api_key_here
   PORT=5000
   ```
   Start the backend server:
   ```bash
   node server.js
   ```

3. **Frontend Setup**:
   Once the backend is running (`http://localhost:5000`), open another terminal window or simply open `index.html` in your browser. You can do this by double-clicking the file or using an extension like **Live Server** in VS Code.

## 🚀 Deployment

### Backend (Render)
1. Push your code to GitHub.
2. Log in to [Render.com](https://render.com) and create a new **Web Service**.
3. Connect your repository.
4. Set the following details:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Go to the "Environment" tab and add your Environment Variable:
   - Key: `TMDB_API_KEY`, Value: `<your-api-key>`
6. Click **Create Web Service**. Wait for the deployment to finish and copy the Render backend URL.

### Frontend (Vercel / Render)
1. Before deploying the frontend, update `SOURCE_URL` in `script.js` to point to your new deployed Render backend URL (e.g., `https://your-backend.onrender.com/api/tmdb/`).
2. Log in to [Vercel.com](https://vercel.com) (or create a Static Site on Render).
3. Connect your repository.
4. Set the **Root Directory** to `./` (the root of the project where `index.html` is).
5. Deploy the application. Vercel will automatically serve the static `index.html`, `styles.css`, and `script.js` files.


## 📁 Project Structure

```text
tmdb frontend/
│
├── backend/         # Express backend to securely proxy TMDB API
│   ├── .env         # Environment variables (API Key)
│   ├── package.json # Backend dependencies
│   └── server.js    # Express server proxy logic
├── assets/          # Contains necessary icons and logo images
├── index.html       # The main HTML document containing the structure
├── script.js        # JavaScript logic for API calls, UI interactions, and search
├── styles.css       # Stylesheet for the application design and responsiveness
└── README.md        # Project documentation
```

##  Acknowledgments
- Data and images provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
- Typography using "Bebas Neue" from [Google Fonts](https://fonts.google.com/).

# Math Fruits

Math Fruits is a React application designed to make learning math fun and engaging through interactive quizzes and information about various fruits. 

## Features

- **Fruit Information**: Displays details about different fruits.
- **Interactive Quizzes**: Users can take quizzes related to fruits and math.
- **Responsive Design**: The application is designed to work on various devices.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (version 14 or later)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/math-fruits.git
   ```

2. Navigate to the project directory:
   ```bash
   cd math-fruits
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the application in development mode, run:
```bash
npm start
```
This will open the application in your default web browser at `http://localhost:3000`.

### Building for Production

To create a production build of the application, run:
```bash
npm run build
```
This will generate a `build` directory with the production-ready files.

### Deployment

#### GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

**Live Site**: [https://harishkaparwan.github.io/math-fruits](https://harishkaparwan.github.io/math-fruits)

#### Setting up GitHub Pages

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section in the left sidebar
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy your app when you push to the main branch

3. **Manual deployment** (if needed):
   ```bash
   npm run deploy:manual
   ```

#### Deployment Features

- ✅ Automatic deployment on push to main branch
- ✅ Manual deployment option available
- ✅ Build optimization for production
- ✅ Modern GitHub Actions workflow with caching
- ✅ Proper permissions and security settings

The deployment workflow is configured in `.github/workflows/deploy.yml` and includes:
- Node.js 18 with npm caching
- Production build generation
- Automatic deployment to GitHub Pages
- Manual trigger option

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
# DevFinder
Welcome to DevFinder, a web application that connects developers by providing a platform to share and collaborate on real-world projects! DevFinder streamlines the process of project discovery and collaboration, offering a seamless experience for users looking to enhance their development skills through hands-on experience. This project has strengthened my skills in building robust, user-focused platforms.

## Quick Demo

- **Live link** - https://devfinder-by-parhlad.vercel.app


## 🚀Technologies Used
#### Frontend:
- Next.js: Server-side rendering and client-side SPA functionality.
- Tailwind CSS: Modern, utility-first styling.
- TypeScript: Strong typing for enhanced maintainability.
- Shadcn UI: For a cohesive and sleek user interface.

#### Backend:
- Node.js: Handling server-side logic.
- MongoDB: Storing developer data and project information.

#### Real-time Communication:
- Socket.io 
- ZegoCloud: Integrated video call functionality for real-time communication between developers.

## 🔑Key Functionality:
- User Registration & Login: Users can create accounts and access personalized features.
- Create and Manage Rooms: Developers can create project rooms to showcase their work and skills.
- Browse Other Rooms: Discover other developers’ projects, connect, and collaborate.
- Real-Time Video Calling: Connect face-to-face through ZegoCloud’s video integration.
- Room Updates & Deletion: Full CRUD (Create, Read, Update, Delete) capabilities for managing rooms.

## Getting Started 

**Note:** *Ensure that Node.js (npm) is installed before proceeding.*

Follow the steps below to install and run the project on your local machine.

**1. Clone this repository:**
  ```bash
  git clone https://github.com/parhladSingh/DevFinder
  ```
  **2. Go to the project directory:**
  ```bash
  cd DevFider
  ```
  **3. Set Up Environment Variables:**
  Create a `.env` file in the root directory and add the following:
  ```bash
  TOKEN_SECRET = "{any_secret_code_for_cookies}"
  MONGO_URL = "{mongoDB_URL_with_devfinder_as_database_name}"
  ```
  **4. Install all dependencies:**
  ```bash
  npm install
  ```
  **5. Start development server:**
  ```bash
   npm run dev
  ```
  **6. Open a second terminal & run:**
  ```bash
  cd signaling-server
  npm start
  ```
  **7. Visit `http://localhost:3000` to see the magic.**

  ## Test Users

  **1st-User -**  *Email* : Parhlad@gmail.com, *Password* : 123456  

**2nd-User -**  *Email* : Ankit@gmail.com, *Password* : 123456

# 📚 FullStackOpen - Part 1: Anecdote Voting App

This is my project for Part 1 of the [Full Stack Open](https://fullstackopen.com/en/) course. It helped me learn the basics of React by building a small app that displays programming-related anecdotes, lets users vote on them, and shows which anecdote has the most votes.

## 🌟 What I Built

- A React app that shows a random anecdote from a list I predefined
- Ability to vote for the currently displayed anecdote
- Keeps track of vote counts using React’s `useState` hook
- Displays the anecdote with the highest votes dynamically
- Conditionally shows the top-voted anecdote only when there’s at least one vote
- A reusable `Button` component to keep my code clean and simple

## 🛠️ Technologies Used

- React (with functional components and hooks)
- JavaScript (ES6+)
- JSX

## 🚀 How to Run It

If you want to try it yourself:

1. Clone the repo and navigate to the project folder:

	```bash
	git clone https://github.com/EricChv/FullStackOpen.git
	cd FullStackOpen/part1/courseinfo

2.	Install dependencies and start the app:
	```bash
	npm install
        npm start


3.	Open http://localhost:3000 in your browser to see the app in action.

📂 Project Structure

courseinfo/
├── App.js        # Main app logic and UI
├── index.js      # Entry point for ReactDOM render
└── components/
    └── Button.js # Reusable button component (optional)

📖 What I Learned
	•	How to create and use React components
	•	Managing state with the useState hook
	•	Handling user events like clicks
	•	Rendering content conditionally
	•	Working with arrays and updating UI dynamically

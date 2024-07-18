import { useState, useEffect } from "react";
import GoalList from "../components/GoalList";
import ProgressBar from "../components/ProgressBar";

const Home = () => {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("goals");
    const savedDate = localStorage.getItem("date");
    const today = new Date().toLocaleDateString();

    if (savedDate !== today) {
      localStorage.setItem("date", today);
      return [];
    }

    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const removeGoal = (index) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
  };

  const toggleComplete = (index) => {
    const newGoals = goals.map((goal, i) =>
      i === index ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(newGoals);
  };

  const totalScore = goals.reduce(
    (acc, goal) => acc + (goal.completed ? goal.score : 0),
    0
  );
  const maxScore = goals.reduce((acc, goal) => acc + goal.score, 0);

  return (
    <div className="container">
      <h1>Daily Goals</h1>
      <ProgressBar current={totalScore} max={maxScore} />
      <GoalList
        goals={goals}
        addGoal={addGoal}
        removeGoal={removeGoal}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default Home;

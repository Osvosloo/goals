import { useState } from "react";
import GoalItem from "./GoalItem";

const GoalList = ({ goals, addGoal, removeGoal, toggleComplete }) => {
  const [newGoal, setNewGoal] = useState("");
  const [newScore, setNewScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.trim() && newScore >= 0) {
      addGoal({ text: newGoal, score: newScore, completed: false });
      setNewGoal("");
      setNewScore(0);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add a new goal"
        />
        <input
          type="number"
          value={newScore}
          onChange={(e) => setNewScore(Number(e.target.value))}
          placeholder="Score"
          min="0"
        />
        <button type="submit">Add Goal</button>
      </form>
      <ul>
        {goals.map((goal, index) => (
          <GoalItem
            key={index}
            goal={goal}
            removeGoal={() => removeGoal(index)}
            toggleComplete={() => toggleComplete(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default GoalList;

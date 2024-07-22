import { useState } from "react";
import GoalItem from "./GoalItem";
import { v4 as uuidv4 } from "uuid";

const GoalList = ({ goals, addGoal, removeGoal, toggleComplete }) => {
  const [newGoal, setNewGoal] = useState("");
  const [newScore, setNewScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.trim() && newScore >= 0) {
      const goal = {
        id: uuidv4(),
        text: newGoal,
        score: newScore,
        completed: false,
      };
      addGoal(goal);
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
        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            removeGoal={() => removeGoal(goal.id)}
            toggleComplete={() => toggleComplete(goal.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default GoalList;

import { useState } from "react";
import GoalItem from "./GoalItem";

const GoalList = ({ goals, setGoals, removeGoal, toggleComplete }) => {
  const [newGoal, setNewGoal] = useState("");
  const [newScore, setNewScore] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.trim() && newScore >= 0) {
      if (editIndex !== null) {
        // Update existing goal
        const updatedGoals = goals.map((goal, index) =>
          index === editIndex
            ? { ...goal, text: newGoal, score: newScore }
            : goal
        );
        setGoals(updatedGoals); // Update state directly
        setEditIndex(null);
      } else {
        // Add new goal
        setGoals([
          ...goals,
          { text: newGoal, score: newScore, completed: false },
        ]);
      }
      setNewGoal("");
      setNewScore(0);
    }
  };

  const handleEdit = (index) => {
    const goalToEdit = goals[index];
    setNewGoal(goalToEdit.text);
    setNewScore(goalToEdit.score);
    setEditIndex(index);
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
        <button type="submit">
          {editIndex !== null ? "Update Goal" : "Add Goal"}
        </button>
      </form>
      <ul>
        {goals.map((goal, index) => (
          <GoalItem
            key={index}
            goal={goal}
            removeGoal={() => removeGoal(index)}
            toggleComplete={() => toggleComplete(index)}
            editGoal={() => handleEdit(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default GoalList;

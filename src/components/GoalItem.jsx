const GoalItem = ({ goal, removeGoal, toggleComplete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={goal.completed}
        onChange={toggleComplete}
      />
      <span
        style={{ textDecoration: goal.completed ? "line-through" : "none" }}
      >
        {goal.text} - {goal.score} points
      </span>
      <button onClick={removeGoal}>Remove</button>
    </li>
  );
};

export default GoalItem;

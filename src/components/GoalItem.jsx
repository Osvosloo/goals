import { FaTrash, FaEdit } from "react-icons/fa";
import { MdCheckCircle, MdCircle } from "react-icons/md";
import "./GoalItem.css"; // Ensure this import is correct

const GoalItem = ({ goal, removeGoal, toggleComplete, editGoal }) => {
  return (
    <li className="goal-item">
      <button onClick={toggleComplete} className="complete-btn">
        {goal.completed ? <MdCheckCircle /> : <MdCircle />}
      </button>
      <div className="goal-content">
        <div className="goal-text">
          <p
            className={`goal-description ${goal.completed ? "completed" : ""}`}
          >
            {goal.text}
          </p>
        </div>
        <div className="goal-score">
          <span className="score-badge">{goal.score}</span>
        </div>
      </div>
      <div className="goal-actions">
        <button onClick={editGoal} className="edit-btn">
          <FaEdit />
        </button>
        <button onClick={removeGoal} className="remove-btn">
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default GoalItem;

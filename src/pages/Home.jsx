import { useState, useEffect } from "react";
import GoalList from "../components/GoalList";
import ProgressBar from "../components/ProgressBar";
import { database } from "../firebase"; // Adjust path as needed
import { ref, set, update, remove, onValue } from "firebase/database";

const Home = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    localStorage.setItem("date", today);

    const goalsRef = ref(database, "goals");
    onValue(goalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGoals(Object.values(data));
      } else {
        setGoals([]);
      }
    });
  }, []);

  useEffect(() => {
    const goalsRef = ref(database, "goals");
    const goalsData = goals.reduce((acc, goal, index) => {
      acc[index] = goal;
      return acc;
    }, {});
    update(goalsRef, goalsData);
  }, [goals]);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const removeGoal = (index) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);

    // Remove the goal from Firebase
    const goalsRef = ref(database, `goals/${index}`);
    remove(goalsRef);
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
        setGoals={setGoals}
        removeGoal={removeGoal}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default Home;

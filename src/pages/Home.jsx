import { useState, useEffect } from "react";
import GoalList from "../components/GoalList";
import ProgressBar from "../components/ProgressBar";
import { database } from "../firebase";
import { ref, onValue, set } from "firebase/database";

const Home = () => {
  const [goals, setGoals] = useState([]);

  // Load goals from Firebase on component mount
  useEffect(() => {
    const loadGoalsFromFirebase = () => {
      const goalsRef = ref(database, "goals");
      onValue(
        goalsRef,
        (snapshot) => {
          const data = snapshot.val();
          console.log("Loaded data:", data); // Debug log
          if (data) {
            const loadedGoals = Object.entries(data).map(([id, goal]) => ({
              id,
              ...goal,
            }));
            setGoals(loadedGoals);
          } else {
            setGoals([]);
          }
        },
        (error) => {
          console.error("Error loading goals:", error);
        }
      );
    };

    loadGoalsFromFirebase();
  }, []);

  // Save goals to Firebase when goals state changes
  useEffect(() => {
    const saveGoalsToFirebase = () => {
      const goalsRef = ref(database, "goals");
      const goalsObject = goals.reduce((acc, goal) => {
        acc[goal.id] = goal;
        return acc;
      }, {});

      console.log("Saving goals to Firebase:", goalsObject); // Debug log

      set(goalsRef, goalsObject)
        .then(() => console.log("Goals saved successfully"))
        .catch((error) => console.error("Error saving goals:", error));
    };

    if (goals.length > 0) {
      saveGoalsToFirebase();
    }
  }, [goals]);

  const addGoal = (goal) => {
    setGoals((prevGoals) => [
      ...prevGoals,
      { ...goal, id: Date.now().toString() }, // Ensure each goal has a unique id
    ]);
  };

  const removeGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  const toggleComplete = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
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

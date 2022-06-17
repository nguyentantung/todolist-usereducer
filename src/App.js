import "./App.css";
import { useReducer, useRef } from "react";
/*
init state
actions
reducer
dipatch
*/
//init state
const initState = {
  job: "",
  jobs: [],
};
//actions
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";
const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};
const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};
const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload,
      };
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
      break;
    case DELETE_JOB:
      const newJobs = state.jobs;
      newJobs.splice(action.payload, 1);
      newState = {
        ...state,
        jobs: newJobs,
      };
      break;
    default:
      throw new Error("Invalid action");
  }
  return newState;
};
function App() {
  const [state, dipatch] = useReducer(reducer, initState);
  const { job, jobs } = state;
  const handleAddJob = () => {
    dipatch(addJob(job));
    dipatch(setJob(""));
    inputRef.current.focus();
  };
  const addJobByEnter = (e) => {
    if (e.key === "Enter") {
      handleAddJob();
    }
  };
  const inputRef = useRef();
  console.log(state);
  return (
    <div className="App">
      <div className="toDoListOut">
        <div className="inputTask">
          <input
            ref={inputRef}
            value={job}
            onChange={(e) => dipatch(setJob(e.target.value))}
            onKeyDown={(e) => addJobByEnter(e)}
            placeholder="Please input task here"
          />
          <button onClick={handleAddJob}>Submit</button>
        </div>
        <div className="listTasks">
          <ul>
            {jobs.map((value, index) => {
              return (
                <li key="index">
                  <span>{value}</span>
                  <span onClick={() => dipatch(deleteJob(index))}>X</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

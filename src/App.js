import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";

import { useState, useEffect } from "react";

import { loadModel } from "./apis/universalSentenceEncoder";

import NoteAppContainer from "./components/NoteAppContainer";
import Login from "./pages/Login";

function AppRoutes(props) {
  const routes = useRoutes([
    { path: "/app", element: <NoteAppContainer isLoaded={props.isLoaded} /> },
    { path: "/", element: <Login isLoaded={props.isLoaded} /> },
  ]);
  return routes;
}

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("Start loading model");
    loadModel().then((res) => setLoaded(true));
  }, []);

  return (
    <div className="App">
      <Router>
        <AppRoutes isLoaded={loaded} />
      </Router>
    </div>
  );
}

export default App;

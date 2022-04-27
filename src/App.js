import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";

import NoteAppContainer from "./components/NoteAppContainer";
import Login from "./pages/Login";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/app", element: <NoteAppContainer /> },
    { path: "/login", element: <Login /> },
  ]);
  return routes;
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;

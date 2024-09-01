import { Link, useLocation } from "react-router-dom";

export function NavBar() {
  const location = useLocation();
  const selectedRouterClasses = "text-amber-200 underline";
  const highlightFor = (path: string) =>
    ({
      "/projects": ["/projects", "/"].includes(location.pathname)
        ? selectedRouterClasses
        : "",
      "/users": ["/users"].includes(location.pathname)
        ? selectedRouterClasses
        : "",
      "/status": ["/status"].includes(location.pathname)
        ? selectedRouterClasses
        : "",
    })[path];

  return (
    <nav className="flex justify-end">
      <ul className="flex gap-10">
        <li className={highlightFor("/projects")}>
          <Link to="/projects">Projects</Link>
        </li>
        <li className={highlightFor("/users")}>
          <Link to="/users">Users</Link>
        </li>
        <li className={highlightFor("/status")}>
          <Link to="/status">Status</Link>
        </li>
      </ul>
    </nav>
  );
}

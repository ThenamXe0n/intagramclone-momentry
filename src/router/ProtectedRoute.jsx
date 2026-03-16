import { Navigate } from "react-router";
import { pagePaths } from "./pagePaths";
import { useSelector } from "react-redux";

/**
 * Wraps routes that require authentication.
 * When isLoggedIn is false, redirects to the login page.
 */
export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn State Value", JSON.stringify(isLoggedIn));
  if (!isLoggedIn) {
    return <Navigate to={pagePaths.login} />;
  }
  return children;
}

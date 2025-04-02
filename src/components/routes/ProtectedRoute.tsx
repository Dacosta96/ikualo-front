import { Navigate, Outlet } from "react-router";
import { useAuth } from "@clerk/clerk-react";

export default function ProtectedRoute() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Navigate to="/signin" replace />;

  return <Outlet />;
}

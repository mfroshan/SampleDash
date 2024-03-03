import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
// import { useRouter } from '../../routes/hooks';

export const AdminProtectedRoute = ({ children }) => {
  const { checkTokenValidity } = useAuth();
  const [isTokenValid, setIsTokenValid] = useState(null);
//   const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const isValid = await checkTokenValidity();
        setIsTokenValid(isValid);
      } catch (error) {
        console.error("Error checking token validity:", error);
        setIsTokenValid(false);
      }
    };

    fetchData();
  }, [checkTokenValidity]);

  if (isTokenValid === null) {
    return null; 
  }

  if (!isTokenValid) {
    toast.warning('User is not Authorized');
    return <Navigate to="/login" />;
  }

  return children;
};

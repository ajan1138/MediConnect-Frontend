import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAccountActivation = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<{ token?: string; submit?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const updateToken = (value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setToken(numericValue);
    
    if (errors.token) {
      setErrors((prev) => ({ ...prev, token: "" }));
    }
  };

  const validateToken = () => {
    const newErrors: { token?: string } = {};
    
    if (!token.trim()) {
      newErrors.token = "Activation code is required";
    } else if (!/^\d{6}$/.test(token)) {
      newErrors.token = "Code must be exactly 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const activateAccount = async () => {
    if (!validateToken()) return false;

    setIsLoading(true);
    setErrors({}); 

    try {
      const response = await fetch(
        `http://localhost:8088/api/v1/auth/activate-account?token=${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          setErrors({ token: "Invalid or expired activation code" });
        } else if (response.status === 404) {
          setErrors({ token: "Activation code not found" });
        } else {
          throw new Error(`Activation failed: ${response.status}`);
        }
        return false;
      }

      navigate("/login", { 
        state: { 
          message: "Account activated successfully! Please log in." 
        } 
      });
      return true;

    } catch (error) {
      console.error("Activation error:", error);
      setErrors({ 
        submit: "Activation failed. Please try again or contact support." 
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendActivationCode = async () => {
    setIsResending(true);
    setErrors({}); 

    try {
      const response = await fetch(
        "http://localhost:8088/api/v1/auth/resend-activation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // You might need to pass email or other identifier
          // body: JSON.stringify({ email: userEmail }),
        }
      );

      if (!response.ok) {
        throw new Error(`Resend failed: ${response.status}`);
      }

      // Show success message (you might want to add a success state)
      console.log("Activation code resent successfully");
      
    } catch (error) {
      console.error("Resend error:", error);
      setErrors({ 
        submit: "Failed to resend code. Please try again." 
      });
    } finally {
      setIsResending(false);
    }
  };

  const resetForm = () => {
    setToken("");
    setErrors({});
  };

  return {
    token,
    errors,
    isLoading,
    isResending,
    updateToken,
    activateAccount,
    resendActivationCode,
    resetForm,
  };
};
import React, { useState, useEffect, useRef } from "react";
import { User, KeyRound, Mail, AlertCircle, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import {
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
} from "../../types/firestore";
import {
  resetPassword,
  login,
  signUp,
  signInWithGoogle,
} from "../../lib/firebase/auth";
import { useAuth } from "../../context/AuthContext";

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  displayName?: string;
}

const initialFormData: AuthFormData = {
  email: "",
  password: "",
  name: "",
};

const initialValidationErrors: ValidationErrors = {
  email: "",
  password: "",
  displayName: "",
};

export default function AuthPopup() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    initialValidationErrors
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showAuthModal: isOpen, setShowAuthModal: setIsOpen, authFormType } = useAuth();  const location = useLocation();
  const navigate = useNavigate();
  // const modalRef = useRef<HTMLDivElement>(null);
  const formId = useRef(`auth-form-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Set the initial form type based on authFormType from context
    setIsSignUp(authFormType === 'signup');
  }, [authFormType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is the modal overlay (the dark background)
      const isOverlayClick =
        event.target instanceof Element &&
        event.target.classList.contains("modal-overlay");

      if (isOverlayClick) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  const validateField = (name: string, value: string) => {
    try {
      if (isSignUp) {
        if (name === "email") {
          signUpSchema.shape.email.parse(value);
        } else if (name === "password") {
          signUpSchema.shape.password.parse(value);
        } else if (name === "name") {
          signUpSchema.shape.displayName.parse(value);
        }
      } else if (!isResetPassword) {
        if (name === "email") {
          loginSchema.shape.email.parse(value);
        } else if (name === "password") {
          loginSchema.shape.password.parse(value);
        }
      } else {
        if (name === "email") {
          resetPasswordSchema.shape.email.parse(value);
        }
      }

      setValidationErrors((prev) => ({
        ...prev,
        [name === "name" ? "displayName" : name]: "",
      }));
    } catch (err) {
      if (err instanceof ZodError) {
        const error = err.errors[0];
        setValidationErrors((prev) => ({
          ...prev,
          [name === "name" ? "displayName" : name]: error.message,
        }));
      }
    }
  };

  const handleZodError = (error: ZodError) => {
    const newValidationErrors: ValidationErrors = {
      ...initialValidationErrors,
    };
    error.errors.forEach((err) => {
      const field = err.path[0] as keyof ValidationErrors;
      if (field) {
        newValidationErrors[field] = err.message;
      }
    });
    setValidationErrors(newValidationErrors);
  };

  const handleSuccessfulAuth = () => {
    const from =
      (location.state as { from?: Location })?.from?.pathname || "/profile";
    navigate(from);
    setIsOpen(false);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setError(null);
    setSuccess(null);
    setValidationErrors(initialValidationErrors);
    setLoading(true);

    if (!formData.email || !formData.password) {
      setValidationErrors((prev) => ({
        ...prev,
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
      }));
      setLoading(false);
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      navigate("/profile");
      setIsOpen(false);
    } catch (err) {
      if (err instanceof ZodError) {
        handleZodError(err);
      } else if (err instanceof Error) {
        if (err.message === "USER_NOT_FOUND") {
          setError(
            "No account found with this email. Would you like to create one?"
          );
          // Store the email for signup form
          const currentEmail = formData.email;
          // After a short delay, switch to signup form
          setTimeout(() => {
            setIsSignUp(true);
            setError(null);
            // Pre-fill the email in the signup form
            setFormData((prev) => ({
              ...prev,
              email: currentEmail,
            }));
          }, 2000);
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await signInWithGoogle();
      handleSuccessfulAuth();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to sign in with Google"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setError(null);
    setSuccess(null);
    setValidationErrors(initialValidationErrors);
    setLoading(true);

    if (!formData.email || !formData.password || !formData.name) {
      setValidationErrors((prev) => ({
        ...prev,
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
        displayName: !formData.name ? "Name is required" : "",
      }));
      setLoading(false);
      return;
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        displayName: formData.name || "",
      });
      setSuccess(
        "Account created successfully. Please check your email for verification."
      );
      setIsSignUp(false);
    } catch (err) {
      if (err instanceof ZodError) {
        handleZodError(err);
      } else {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setValidationErrors(initialValidationErrors);
    setLoading(true);

    if (!formData.email) {
      setValidationErrors((prev) => ({
        ...prev,
        email: !formData.email ? "Email is required" : "",
      }));
      setLoading(false);
      return;
    }

    try {
      await resetPassword({ email: formData.email });
      setSuccess("Password reset email sent. Please check your inbox.");
    } catch (err) {
      if (err instanceof ZodError) {
        handleZodError(err);
      } else {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => new Set(prev).add(name));
    validateField(name, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTouchedFields((prev) => new Set(prev).add(name));

    if (touchedFields.has(name)) {
      validateField(name, value);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setError(null);
    setSuccess(null);
    setValidationErrors(initialValidationErrors);
    setIsResetPassword(false);
    setIsSignUp(false);
    setIsSubmitted(false);
    setTouchedFields(new Set());
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <User size={16} />
        Sign In
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  modal-overlay">
          <div
            // ref={modalRef}
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold">
                {isResetPassword
                  ? "Reset Password"
                  : isSignUp
                  ? "Create an account"
                  : "Sign in to your account"}
              </h2>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-500">
                <AlertCircle className="h-4 w-4" />
                <p>{success}</p>
              </div>
            )}

            <form
              onSubmit={
                isResetPassword
                  ? handleResetPassword
                  : isSignUp
                  ? handleEmailSignUp
                  : handleEmailSignIn
              }
              className="space-y-4"
            >
              {isSignUp && (
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor={`${formId.current}-name`}
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      id={`${formId.current}-name`}
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-md border pl-10 py-2 text-sm ${
                        touchedFields.has("name") &&
                        validationErrors.displayName
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500`}
                      placeholder="John Doe"
                      disabled={loading}
                    />
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                  {touchedFields.has("name") &&
                    validationErrors.displayName && (
                      <p className="text-sm text-red-500">
                        {validationErrors.displayName}
                      </p>
                    )}
                </div>
              )}

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor={`${formId.current}-email`}
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id={`${formId.current}-email`}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-md border pl-10 py-2 text-sm ${
                      touchedFields.has("email") && validationErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500`}
                    placeholder="example@email.com"
                    disabled={loading}
                  />
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                {touchedFields.has("email") && validationErrors.email && (
                  <p className="text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {!isResetPassword && (
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor={`${formId.current}-password`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id={`${formId.current}-password`}
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-md border pl-10 py-2 text-sm ${
                        touchedFields.has("password") &&
                        validationErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500`}
                      placeholder="••••••••"
                      disabled={loading}
                    />
                    <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                  {touchedFields.has("password") &&
                    validationErrors.password && (
                      <p className="text-sm text-red-500">
                        {validationErrors.password}
                      </p>
                    )}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading
                  ? "Loading..."
                  : isResetPassword
                  ? "Send Reset Link"
                  : isSignUp
                  ? "Sign Up"
                  : "Sign In"}
              </button>

              {!isResetPassword && (
                <div className="text-center text-sm">
                  <span className="text-gray-500">
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}
                  </span>
                  <button
                    type="button"
                    className="ml-1.5 text-gray-900 underline hover:text-gray-800"
                    onClick={() => {
                      resetForm();
                      setIsSignUp(!isSignUp);
                    }}
                    disabled={loading}
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </div>
              )}

              {!isSignUp && !isResetPassword && (
                <div className="text-center text-sm">
                  <button
                    type="button"
                    className="text-gray-900 underline hover:text-gray-800"
                    onClick={() => {
                      resetForm();
                      setIsResetPassword(true);
                    }}
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {isResetPassword && (
                <div className="text-center text-sm">
                  <button
                    type="button"
                    className="text-gray-900 underline hover:text-gray-800"
                    onClick={() => {
                      resetForm();
                    }}
                    disabled={loading}
                  >
                    Back to Sign In
                  </button>
                </div>
              )}
            </form>

            {!isResetPassword && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">or</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

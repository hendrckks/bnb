import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  NextOrObserver,
  User,
  // updatePassword as firebaseUpdatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
  updatePassword,
  AuthErrorCodes,
} from "firebase/auth";
import { auth, db } from "./clientApp";
import {
  SignUpInput,
  LoginInput,
  ResetPasswordInput,
  // PasswordChangeInput,
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  // passwordChangeSchema,
} from "../../types/firestore";
import { SESSION_DURATION } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ZodError } from "zod";
// import { useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

let sessionTimeout: NodeJS.Timeout | null = null;

export const startSessionTimeout = (callback: () => void) => {
  if (sessionTimeout) {
    clearTimeout(sessionTimeout);
  }
  sessionTimeout = setTimeout(callback, SESSION_DURATION);
};

export const clearSessionTimeout = () => {
  if (sessionTimeout) {
    clearTimeout(sessionTimeout);
    sessionTimeout = null;
  }
};

export const signUp = async (userData: SignUpInput) => {
  try {
    const validatedData = signUpSchema.parse(userData);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      validatedData.email,
      validatedData.password
    );

    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    await updateProfile(user, {
      displayName: validatedData.displayName,
    });

    await setDoc(doc(db, "users", user.uid), {
      displayName: validatedData.displayName,
      email: validatedData.email,
      // Add any other initial user data you want to store
    });

    // Sign out the user immediately after creating the account
    await firebaseSignOut(auth);

    return {
      success: true,
      message: "Verification email sent. Please check your inbox.",
    };
  } catch (error: any) {
    // console.error("Error signing up: ", error);

    if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
      throw new Error(
        "The email is already in use. Please use a different email or SignIn."
      );
    }

    throw error;
  }
};

export const login = async (userData: LoginInput) => {
  try {
    const validatedData = loginSchema.parse(userData);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      validatedData.email,
      validatedData.password
    );
    startSessionTimeout(() => {
      signOut();
    });

    const user = userCredential.user;

    if (!user.emailVerified) {
      await firebaseSignOut(auth);
      throw new Error("Please verify your email before logging in.");
    }

    return user;
  } catch (error: any) {
    console.log("Firebase auth error:", error.code); // For debugging

    // Firebase uses 'auth/user-not-found' as the error code
    if (error?.code === "auth/user-not-found") {
      throw new Error("USER_NOT_FOUND");
    }

    // Handle other specific Firebase auth errors
    switch (error?.code) {
      case "auth/wrong-password":
        throw new Error("Incorrect password. Please try again.");
      case "auth/too-many-requests":
        throw new Error(
          "Too many failed login attempts. Please try again later."
        );
      case "auth/invalid-email":
        throw new Error(
          "Invalid email format. Please enter a valid email address."
        );
      case "auth/invalid-credential":
        throw new Error("Invalid email or password. Please try again.");
      default:
        // If it's a ZodError, rethrow it
        if (error instanceof ZodError) {
          throw error;
        }
        // For any other errors
        throw new Error(
          error?.message || "An unexpected error occurred. Please try again."
        );
    }
  }
};

export const resendVerificationEmail = async (user: User) => {
  try {
    await sendEmailVerification(user);
    return {
      success: true,
      message: "Verification email resent. Please check your inbox. ",
    };
  } catch (error) {
    // console.error("Error resending verification email: ", error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user document exists, if not, create it
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        // Add any other initial user data you want to store
      });
    }

    return user;
  } catch (error) {
    // console.error("Error signing in with Google: ", error);
    throw error;
  }
};

export const resetPassword = async (resetData: ResetPasswordInput) => {
  try {
    const validatedData = resetPasswordSchema.parse(resetData);
    await sendPasswordResetEmail(auth, validatedData.email);
  } catch (error) {
    // console.error("Error resetting password: ", error);
    throw error;
  }
};

export const changePassword = async (
  user: User,
  currentPassword: string,
  newPassword: string
) => {
  try {
    // Reauthenticate the user
    const credential = EmailAuthProvider.credential(
      user.email!,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    // Update the password
    await updatePassword(user, newPassword);

    return true;
  } catch (error) {
    // console.error("Error changing password:", error);
    throw error;
  }
};

export const reauthenticateUser = async (
  user: User,
  currentPassword: string
) => {
  if (!user.email) {
    throw new Error("User email not provided");
  }
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    clearSessionTimeout();
  } catch (error) {
    // console.error("Error signing out: ", error);
    throw error;
  }
};

export const resetSessionTimeout = (callback: () => void) => {
  clearSessionTimeout();
  startSessionTimeout(callback);
};

export const onAuthStateChanged = (cb: NextOrObserver<User>) => {
  return firebaseOnAuthStateChanged(auth, cb);
};

// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     updateProfile,
//     signOut as firebaseSignOut,
//     onAuthStateChanged as firebaseOnAuthStateChanged,
//     signInWithPopup,
//     GoogleAuthProvider,
//     NextOrObserver,
//     User,
//     reauthenticateWithCredential,
//     EmailAuthProvider,
//     updatePassword,
//     AuthErrorCodes,
//   } from "firebase/auth";
//   import { auth, db } from "./clientApp";
//   import {
//     SignUpInput,
//     LoginInput,
//     ResetPasswordInput,
//     signUpSchema,
//     loginSchema,
//     resetPasswordSchema,
//   } from "../../types/firestore";
//   import { SESSION_DURATION } from "./config";
//   import {
//     doc,
//     getDoc,
//     setDoc,
//     collection,
//     query,
//     where,
//     getDocs,
//     deleteDoc,
//     addDoc,
//     Timestamp,
//   } from "firebase/firestore";
//   import emailjs from "@emailjs/browser";
//   import crypto from "crypto";

//   // Initialize EmailJS
//   emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

//   const googleProvider = new GoogleAuthProvider();

//   let sessionTimeout: NodeJS.Timeout | null = null;

//   // Session management functions
//   export const startSessionTimeout = (callback: () => void) => {
//     if (sessionTimeout) {
//       clearTimeout(sessionTimeout);
//     }
//     sessionTimeout = setTimeout(callback, SESSION_DURATION);
//   };

//   export const clearSessionTimeout = () => {
//     if (sessionTimeout) {
//       clearTimeout(sessionTimeout);
//       sessionTimeout = null;
//     }
//   };

//   // Generate verification token
//   const generateVerificationToken = () => {
//     return crypto.randomBytes(32).toString("hex");
//   };

//   // Send verification email using EmailJS
//   const sendVerificationEmail = async (email: string, token: string) => {
//     const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

//     try {
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_VERIFICATION_TEMPLATE_ID!,
//         {
//           to_email: email,
//           verification_link: verificationLink,
//         }
//       );
//     } catch (error) {
//       console.error("Error sending verification email:", error);
//       throw new Error("Failed to send verification email");
//     }
//   };

//   // Sign up process
//   export const signUp = async (userData: SignUpInput) => {
//     try {
//       const validatedData = signUpSchema.parse(userData);

//       // Check if email exists in auth
//       const emailQuery = query(
//         collection(db, "users"),
//         where("email", "==", validatedData.email)
//       );
//       const existingUserDocs = await getDocs(emailQuery);

//       if (!existingUserDocs.empty) {
//         throw new Error("An account with this email already exists.");
//       }

//       // Check pending registrations
//       const pendingUsersRef = collection(db, "pendingUsers");
//       const pendingQuery = query(
//         pendingUsersRef,
//         where("email", "==", validatedData.email)
//       );
//       const existingPending = await getDocs(pendingQuery);

//       if (!existingPending.empty) {
//         throw new Error(
//           "A verification email has already been sent to this address."
//         );
//       }

//       // Generate verification token
//       const verificationToken = generateVerificationToken();
//       const expiresAt = Timestamp.fromDate(
//         new Date(Date.now() + 24 * 60 * 60 * 1000)
//       );

//       // Store pending user data
//       await addDoc(collection(db, "pendingUsers"), {
//         email: validatedData.email,
//         displayName: validatedData.displayName,
//         passwordHash: validatedData.password,
//         verificationToken,
//         expiresAt,
//         createdAt: Timestamp.now(),
//       });

//       // Send verification email
//       await sendVerificationEmail(validatedData.email, verificationToken);

//       return {
//         success: true,
//         message:
//           "Verification email sent. Please check your inbox to complete registration.",
//       };
//     } catch (error: any) {
//       console.error("Error in signup process:", error);

//       if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
//         throw new Error(
//           "The email is already in use. Please use a different email or sign in."
//         );
//       }

//       throw error;
//     }
//   };

//   // Send password reset email using EmailJS
//   const sendPasswordResetEmail = async (email: string, token: string) => {
//     const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

//     try {
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_RESET_TEMPLATE_ID!,
//         {
//           to_email: email,
//           reset_link: resetLink,
//         }
//       );
//     } catch (error) {
//       console.error("Error sending password reset email:", error);
//       throw new Error("Failed to send password reset email");
//     }
//   };

//   // Email verification process
//   export const verifyEmail = async (token: string) => {
//     try {
//       // Find pending user with this token
//       const pendingUsersRef = collection(db, "pendingUsers");
//       const tokenQuery = query(
//         pendingUsersRef,
//         where("verificationToken", "==", token)
//       );
//       const querySnapshot = await getDocs(tokenQuery);

//       if (querySnapshot.empty) {
//         throw new Error("Invalid or expired verification token.");
//       }

//       const pendingUserDoc = querySnapshot.docs[0];
//       const pendingUserData = pendingUserDoc.data();

//       // Check if token is expired
//       if (pendingUserData.expiresAt.toDate() < new Date()) {
//         await deleteDoc(pendingUserDoc.ref);
//         throw new Error("Verification link has expired. Please sign up again.");
//       }

//       // Create Firebase auth user
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         pendingUserData.email,
//         pendingUserData.passwordHash
//       );

//       const user = userCredential.user;

//       // Update user profile
//       await updateProfile(user, {
//         displayName: pendingUserData.displayName,
//       });

//       // Create user document
//       await setDoc(doc(db, "users", user.uid), {
//         displayName: pendingUserData.displayName,
//         email: pendingUserData.email,
//         createdAt: Timestamp.now(),
//       });

//       // Delete pending user document
//       await deleteDoc(pendingUserDoc.ref);

//       // Sign out the user
//       await firebaseSignOut(auth);

//       return {
//         success: true,
//         message: "Email verified successfully. You can now log in.",
//       };
//     } catch (error) {
//       console.error("Error in email verification:", error);
//       throw error;
//     }
//   };

//   // Password reset request
//   export const resetPassword = async (resetData: ResetPasswordInput) => {
//     try {
//       const validatedData = resetPasswordSchema.parse(resetData);

//       // Check if user exists in pending verification
//       const pendingUsersRef = collection(db, "pendingUsers");
//       const pendingQuery = query(
//         pendingUsersRef,
//         where("email", "==", validatedData.email)
//       );
//       const pendingSnapshot = await getDocs(pendingQuery);

//       if (!pendingSnapshot.empty) {
//         throw new Error("Please verify your email before resetting password.");
//       }

//       // Generate password reset token
//       const resetToken = generateVerificationToken();
//       const expiresAt = Timestamp.fromDate(
//         new Date(Date.now() + 1 * 60 * 60 * 1000)
//       ); // 1 hour

//       // Store reset token in Firestore
//       await addDoc(collection(db, "passwordResets"), {
//         email: validatedData.email,
//         resetToken,
//         expiresAt,
//         createdAt: Timestamp.now(),
//       });

//       // Send password reset email
//       await sendPasswordResetEmail(validatedData.email, resetToken);

//       return {
//         success: true,
//         message: "Password reset instructions sent to your email.",
//       };
//     } catch (error) {
//       console.error("Error requesting password reset:", error);
//       throw error;
//     }
//   };

//   // Login process
//   export const login = async (userData: LoginInput) => {
//     try {
//       const validatedData = loginSchema.parse(userData);

//       // Check if user exists in pending verification
//       const pendingUsersRef = collection(db, "pendingUsers");
//       const pendingQuery = query(
//         pendingUsersRef,
//         where("email", "==", validatedData.email)
//       );
//       const pendingSnapshot = await getDocs(pendingQuery);

//       if (!pendingSnapshot.empty) {
//         throw new Error("Please verify your email before logging in.");
//       }

//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         validatedData.email,
//         validatedData.password
//       );

//       return userCredential.user;
//     } catch (error) {
//       console.error("Login error:", error);

//       if (error instanceof Error) {
//         if (error.message.includes("user-not-found")) {
//           throw new Error(
//             "No account found with this email. Please check your email or sign up."
//           );
//         } else if (error.message.includes("wrong-password")) {
//           throw new Error("Incorrect password. Please try again.");
//         } else if (error.message.includes("too-many-requests")) {
//           throw new Error(
//             "Too many failed login attempts. Please try again later."
//           );
//         } else if (error.message.includes("invalid-email")) {
//           throw new Error(
//             "Invalid email format. Please enter a valid email address."
//           );
//         }
//       }

//       throw new Error("An unexpected error occurred. Please try again.");
//     }
//   };

//   // Google Sign In
//   export const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       // Check if user document exists
//       const userDocRef = doc(db, "users", user.uid);
//       const userDocSnap = await getDoc(userDocRef);

//       if (!userDocSnap.exists()) {
//         await setDoc(userDocRef, {
//           displayName: user.displayName,
//           email: user.email,
//           createdAt: Timestamp.now(),
//         });
//       }

//       return user;
//     } catch (error) {
//       console.error("Error signing in with Google:", error);
//       throw error;
//     }
//   };

//   // Change password
//   export const changePassword = async (
//     user: User,
//     currentPassword: string,
//     newPassword: string
//   ) => {
//     try {
//       // Reauthenticate user
//       const credential = EmailAuthProvider.credential(
//         user.email!,
//         currentPassword
//       );
//       await reauthenticateWithCredential(user, credential);

//       // Update password
//       await updatePassword(user, newPassword);

//       return {
//         success: true,
//         message: "Password updated successfully.",
//       };
//     } catch (error) {
//       console.error("Error changing password:", error);
//       throw error;
//     }
//   };

//   // Reauthenticate user
//   export const reauthenticateUser = async (
//     user: User,
//     currentPassword: string
//   ) => {
//     if (!user.email) {
//       throw new Error("User email not found");
//     }
//     const credential = EmailAuthProvider.credential(user.email, currentPassword);
//     await reauthenticateWithCredential(user, credential);
//   };

//   // Sign out
//   export const signOut = async () => {
//     try {
//       await firebaseSignOut(auth);
//       clearSessionTimeout();
//     } catch (error) {
//       console.error("Error signing out:", error);
//       throw error;
//     }
//   };

//   // Reset session timeout
//   export const resetSessionTimeout = (callback: () => void) => {
//     clearSessionTimeout();
//     startSessionTimeout(callback);
//   };

//   // Auth state observer
//   export const onAuthStateChanged = (cb: NextOrObserver<User>) => {
//     return firebaseOnAuthStateChanged(auth, cb);
//   };

//   // Cleanup expired pending users and password reset tokens
//   export const cleanupExpiredTokens = async () => {
//     const now = Timestamp.now();

//     // Cleanup pending users
//     const pendingUsersRef = collection(db, "pendingUsers");
//     const expiredPendingQuery = query(
//       pendingUsersRef,
//       where("expiresAt", "<", now)
//     );
//     const expiredPendingDocs = await getDocs(expiredPendingQuery);

//     const pendingDeletePromises = expiredPendingDocs.docs.map((doc) =>
//       deleteDoc(doc.ref)
//     );
//     await Promise.all(pendingDeletePromises);

//     // Cleanup password reset tokens
//     const resetTokensRef = collection(db, "passwordResets");
//     const expiredResetQuery = query(resetTokensRef, where("expiresAt", "<", now));
//     const expiredResetDocs = await getDocs(expiredResetQuery);

//     const resetDeletePromises = expiredResetDocs.docs.map((doc) =>
//       deleteDoc(doc.ref)
//     );
//     await Promise.all(resetDeletePromises);
//   };

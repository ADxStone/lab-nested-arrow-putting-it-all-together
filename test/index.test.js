function createLoginTracker(userInfo) {
  let attemptCount = 0;

  return (passwordAttempt) => {
    attemptCount++;

    if (passwordAttempt === userInfo.password && attemptCount <= 3) {
      return "Login successful";
    }

    if (attemptCount <= 3) {
      return `Attempt ${attemptCount}: Login failed`;
    }

    // More than 3 attempts
    return "Account locked due to too many failed login attempts";
  };
}

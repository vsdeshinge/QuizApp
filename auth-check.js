// auth-check.js
(async function () {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "login.html";
  } else {
    // Optional: Verify token with Firebase
    try {
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=YOUR_API_KEY`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token })
      });
      if (!res.ok) throw new Error("Invalid token");
    } catch (error) {
      localStorage.removeItem("authToken");
      window.location.href = "login.html";
    }
  }
})();

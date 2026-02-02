// Quick test to see if js-cookie works
import Cookies from "js-cookie";

// Test setting a cookie
Cookies.set("test_token", "test123", { expires: 30, sameSite: "Lax" });

// Test getting a cookie
const token = Cookies.get("test_token");
// console.log('Token retrieved:', token);

// Test removing a cookie
Cookies.remove("test_token");
const removedToken = Cookies.get("test_token");
// console.log('After removal:', removedToken);

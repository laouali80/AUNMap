// globalStorage.js
const GlobalStorage = {
  // Default user (for demo/login purposes)
  currentUser: {
    firstName: "Sam",
    lastName: "Demo",
    email: "sam@gmail.com",
    password: "password",
    agree: true,
  },

  // Array to store all registered users
  users: [
    {
      firstName: "Sam",
      lastName: "Demo",
      email: "sam@gmail.com",
      password: "password",
      agree: true,
    },
  ],

  // Method to register a new user
  registerUser(userData) {
    // Check if user already exists
    const existingUser = this.users.find(
      (user) => user.email === userData.email
    );
    if (existingUser) {
      return { success: false, message: "User already exists with this email" };
    }

    // Add new user to users array
    this.users.push(userData);

    // Set as current user
    this.currentUser = userData;

    return { success: true, message: "User registered successfully" };
  },

  // Method to login user
  loginUser(email, password) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      this.currentUser = user;
      return { success: true, user };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  },

  // Method to get current user
  getCurrentUser() {
    return this.currentUser;
  },

  // Method to check if user is logged in
  isLoggedIn() {
    return !!this.currentUser;
  },

  // Method to logout
  logout() {
    this.currentUser = null;
  },

  // Method to get all users (for debugging)
  getAllUsers() {
    return this.users;
  },
};

// // Make it available globally
// if (typeof window !== 'undefined') {
//   window.GlobalStorage = GlobalStorage;
// }

export default GlobalStorage;

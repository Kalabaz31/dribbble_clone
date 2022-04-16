import { client } from "../../client";

// Login user
const register = async (userData) => {

  console.log("register")
  console.log(userData)
  
  return await client.create(userData).then((user) => {
    console.log(user)
    if (!user) {
      throw new Error("Wrong Credentials");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    }
  }).catch(err => {
    throw new Error(err);
  });
};


// Login user
const login = async (userData) => {
  const query =
    '*[_type == "user" && (userName == $userName || email == $userName ) && password == $password]{userName, email, image, _id}';
  const params = { userName: userData.username, password: userData.password };

  return await client.fetch(query, params).then((users) => {
    if (users.length === 0) {
      throw new Error("Wrong Credentials");
    } else {
      localStorage.setItem("user", JSON.stringify(users[0]));
      return users[0];
    }
  });
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { logout, login, register };

export default authService;

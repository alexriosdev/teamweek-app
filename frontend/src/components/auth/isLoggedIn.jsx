const isLoggedIn = () => {
  return localStorage.token ? true : false;
};

export default isLoggedIn;

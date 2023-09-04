import { useContext, useState } from "react";
import { StoreContext } from "../store/storeProvider";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import UserService from "../service/UserService";

const Login = () => {
  const { setUser } = useContext(StoreContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginChange = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    UserService.loginUser({ email, password }).then((r) => {
      console.log(r);
      for (const [key, value] of Object.entries(r.data)) {
        if (value === null) {
          return alert("Zły email lub hasło!");
        }
      }
      setUser(r.data);

      navigate("/scheduled");
    });
  };
  return (
    <form onSubmit={handleLoginSubmit} className="form login">
      <label htmlFor="email">
        E-mail
        <input
          type="email"
          className="input login__input"
          placeholder="E-mail..."
          name="email"
          value={email}
          onChange={onLoginChange}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          className="input login__input"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
      </label>
      <button type="submit" className="login__btn">
        Zaloguj się
      </button>
    </form>
  );
};

export default Login;

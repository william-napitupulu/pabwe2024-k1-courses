import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function RegisterInput({ onAuthRegister }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    onAuthRegister({ name, email, password });
  };

  return (
    <form className="register-form-container" onSubmit={handleSubmit}>
      <div className="form px-4">
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="inputName"
            value={name}
            onChange={onNameChange}
            className="form-control register-input"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="inputEmail"
            value={email}
            onChange={onEmailChange}
            className="form-control register-input"
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            value={password}
            onChange={onPasswordChange}
            className="form-control register-input"
            required
          />
        </div>
        <div className="mb-4 text-end">
          <button type="submit" className="btn btn-primary register-button">
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  onAuthRegister: PropTypes.func.isRequired,
};

export default RegisterInput;

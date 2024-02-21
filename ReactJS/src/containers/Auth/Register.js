import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Register.scss";
import { FormattedMessage } from "react-intl";
import { handleRegisterApi } from "../../services/userService";
import { toast } from "react-toastify";

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      errMessage: "",
      isChecked: false,
    };
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleOnChangeConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    this.setState({ confirmPassword });
  };

  handleOnChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleRegister = async () => {
    this.setState({
      errMessage: "",
    });
    let { password, confirmPassword, isChecked } = this.state;

    if (!isChecked) {
      this.setState({
        errMessage: "You must agree to the Terms and Privacy Policy.",
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        errMessage: "Passwords do not match!",
      });
      return;
    }
    try {
      let data = await handleRegisterApi(
        this.state.email,
        this.state.name,
        this.state.password
      );
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.errMessage,
        });
      }
      if (data && data.errCode === 0) {
        this.setState({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          isChecked: false,
        });
        toast.success("Register success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.errMessage,
          });
        }
      }
    }
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleViewLogin = () => {
    this.props.history.push(`/login`);
  };

  render() {
    return (
      <div className="register-background">
        <div className="register-container">
          <div className="register-content row">
            <div className="col-12 text-register">Register</div>
            <div className="col-12 form-group register-input">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="col-12 form-group register-input">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeName(event)}
              />
            </div>
            <div className="col-12 form-group register-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
              </div>
            </div>
            <div className="col-12 form-group register-input">
              <label>Confirm Password:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  value={this.state.confirmPassword}
                  onChange={(event) =>
                    this.handleOnChangeConfirmPassword(event)
                  }
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
              </div>
            </div>
            <div className="col-12 agree">
              <input
                type="checkbox"
                checked={this.state.isChecked}
                onChange={(event) => {
                  this.setState({ isChecked: event.target.checked });
                }}
              />
              <label className="label-agree">
                I agree to the Terms and Privacy Policy
              </label>
            </div>
            <div className="col-12 error">{this.state.errMessage}</div>
            <div className="col-6">
              <button className="btn-register" onClick={this.handleRegister}>
                Sign Up
              </button>
            </div>
            <div className="col-6">
              <button className="btn-login" onClick={this.handleViewLogin}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { USER_ROLE } from "../utils";
import _ from "lodash";

class Home extends Component {
  render() {
    let { userInfo, isLoggedIn } = this.props;
    let linkToRedirect = "";
    if (!isLoggedIn) {
      linkToRedirect = "/login";
    } else {
      if (userInfo && !_.isEmpty(userInfo)) {
        let role = userInfo.roleId;
        if (role === USER_ROLE.ADMIN) {
          linkToRedirect = "/system/user-manage";
        }
        if (role === USER_ROLE.DOCTOR) {
          linkToRedirect = "/doctor/doctor-manage-schedule";
        }
        if (role === USER_ROLE.PATIENT) {
          linkToRedirect = "/home";
        }
      }
    }
    // let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

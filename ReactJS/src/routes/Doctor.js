import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import DoctorManageSchedule from "../containers/System/Doctor/DoctorManageSchedule";
import Header from "../containers/Header/Header";

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="doctor-container">
          <div className="doctor-list">
            <Switch>
              <Route
                path="/doctor/doctor-manage-schedule"
                component={DoctorManageSchedule}
              />
              <Route path="/doctor/manage-patient" component={ManagePatient} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DoctorMenuPath: state.app.DoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

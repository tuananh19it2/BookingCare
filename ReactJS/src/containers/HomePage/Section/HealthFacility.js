import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import "./HealthFacility.scss";
import { withRouter } from "react-router";

class HealthFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (clinic) => {
    this.props.history.push(`/detail-clinic/${clinic.id}`);
  };
  handleViewListClinic = () => {
    this.props.history.push(`/list-clinic`);
  };

  render() {
    let { dataClinics } = this.state;
    return (
      <div className="section-share section-health-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.health-facility" />
            </span>
            <button className="btn-section" onClick={this.handleViewListClinic}>
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      className="section-customize health-facility-child"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-image section-health-facility"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="health-facility-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HealthFacility)
);

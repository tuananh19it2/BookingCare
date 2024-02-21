import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import "./RecommendDoctor.scss";

class RecommendDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendDoctors: [],
    };
  }

  componentDidMount() {
    this.handleRecommendation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.handleRecommendation();
    }
  }

  handleRecommendation = () => {
    let { userInfo } = this.props;

    fetch("http://127.0.0.1:5000/api/recommend_doctor", {
      method: "POST",
      body: JSON.stringify({ _id: userInfo?.id }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ recommendDoctors: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.ID}`);
  };

  render() {
    let { recommendDoctors } = this.state;

    return (
      <>
        {recommendDoctors.length > 0 ? (
          <div className="section-share section-recommend-doctor">
            <div className="section-container">
              <div className="section-header">
                <span className="title-section">
                  <FormattedMessage id="homepage.recommend-doctor" />
                </span>
              </div>
              <div className="ds-bacsi section-body">
                <Slider {...this.props.settings}>
                  {recommendDoctors.map((item, index) => {
                    let name = `${item.LastName} ${item.FirstName}`;
                    return (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="customize-border outstanding-doctor-child">
                          <div className="outer-bg img-recommend">
                            <div
                              className="bg-image section-outstanding-doctor"
                              style={{
                                backgroundImage: `url(${item.Image})`,
                              }}
                            ></div>
                          </div>
                          <div className="position text-center">
                            <div>
                              <div>Bác sĩ, {name}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecommendDoctor)
);

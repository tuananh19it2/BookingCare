import React, { Component } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import HomeHeader from "../../HomePage/HomeHeader";
import { Fragment } from "react";
import "./DoctorDetail.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import HomeFooter from "../../HomePage/HomeFooter";

class DoctorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      this.setState({
        currentDoctorId: id,
      });

      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate() {}

  render() {
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVI}, ${detailDoctor.lastName}  ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEN}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    return (
      <Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="section-share section-detail-doctor">
          <div className="intro-doctor">
            <div className="section-container">
              <div className="intro-doctor-content">
                <div
                  className="content-left-intro-doctor"
                  style={{
                    backgroundImage: `url(${
                      detailDoctor && detailDoctor.image
                        ? detailDoctor.image
                        : ""
                    })`,
                  }}
                ></div>
                <div className="content-right-intro-doctor">
                  <div className="up-content-right">
                    {language === LANGUAGES.VI ? nameVi : nameEn}
                  </div>
                  <div className="down-content-right">
                    {detailDoctor &&
                      detailDoctor.Markdown &&
                      detailDoctor.Markdown.description && (
                        <span>{detailDoctor.Markdown.description}</span>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="section-schedule-doctor section-container">
              <div className="content-left-schedule-doctor">
                <DoctorSchedule
                  doctorIdFromParent={this.state.currentDoctorId}
                />
              </div>
              <div className="content-right-schedule-doctor">
                <DoctorExtraInfor
                  doctorIdFromParent={this.state.currentDoctorId}
                />
              </div>
            </div>
          </div>
          <div className="detail-info-doctor">
            <div className="section-container">
              {detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.Markdown.contentHTML,
                    }}
                  ></div>
                )}
            </div>
          </div>
        </div>
        <HomeFooter />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);

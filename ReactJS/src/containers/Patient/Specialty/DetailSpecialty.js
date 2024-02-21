import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      isTruncated: true,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailSpecialtyById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCodeService("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEN: "ALL",
            valueVI: "Toàn quốc",
          });
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  handleOnchangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };

  toggleTruncate = () => {
    this.setState((prevState) => ({
      isTruncated: !prevState.isTruncated,
    }));
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    let {
      arrDoctorId,
      dataDetailSpecialty,
      listProvince,
      isTruncated,
    } = this.state;
    let { language } = this.props;

    return (
      <div className="section-share section-detail-specialty">
        <div className="detail-specialty-body">
          <HomeHeader />
          <div
            className="up"
            style={{
              backgroundImage: `url(${dataDetailSpecialty.image})`,
            }}
          >
            <div className="up-child">
              <div className="section-container">
                <div className="description-specialty">
                  {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                    <div>
                      {isTruncated ? (
                        <div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: dataDetailSpecialty.descriptionHTML.slice(
                                0,
                                700
                              ),
                            }}
                          ></div>
                          <button
                            className="btn-button"
                            onClick={this.toggleTruncate}
                          >
                            Đọc thêm
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: dataDetailSpecialty.descriptionHTML,
                            }}
                          ></div>
                          <button
                            className="btn-button"
                            onClick={this.toggleTruncate}
                          >
                            Ẩn bớt
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="down">
            <div className="section-container">
              <div className="search-sp-doctor">
                <select onChange={(event) => this.handleOnchangeSelect(event)}>
                  {listProvince &&
                    listProvince.length > 0 &&
                    listProvince.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>

              {arrDoctorId &&
                arrDoctorId.length > 0 &&
                arrDoctorId.map((item, index) => {
                  return (
                    <div className="each-doctor-specialty" key={index}>
                      <div className="dt-content-left-specialty">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                        />
                      </div>
                      <div className="dt-content-right-specialty">
                        <div className="doctor-schedule">
                          <DoctorSchedule doctorIdFromParent={item} />
                        </div>
                        <div className="doctor-extra-info">
                          <DoctorExtraInfor doctorIdFromParent={item} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <HomeFooter />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);

import React, { Component, useState } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo-top.png";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";
import axios from "axios";
import { Menu, Dropdown, Button } from "antd";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import * as actions from "../../store/actions";
import vi from "../../assets/vi.png";
import en from "../../assets/en.png";
import iconPatient from "../../assets/patient_icon.jpg";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchResults: [],
      suggestions: [],
      user: this.props.userInfo?.name || "",
    };
    this.recognition = null;
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;

    const grammar = "#JSGF V1.0;";
    this.recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = speechRecognitionList;
    this.recognition.lang = "vi-VN";
    this.recognition.interimResults = false;

    this.recognition.onresult = async (event) => {
      const lastResult = event.results.length - 1;
      const content = event.results[lastResult][0].transcript.slice(0, -1);
      this.setState({ query: content });
      // Gọi handleChange để thực hiện tìm kiếm và hiển thị kết quả ngay khi có nội dung từ giọng nói
      await this.handleChange({ target: { value: content } });
    };

    this.recognition.onspeechend = () => {
      this.recognition.stop();
    };

    this.recognition.onerror = (event) => {
      console.log("Error occurred in recognition: ", event.error);
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({ user: this.props.userInfo.name || "" });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleTalkClick = () => {
    this.recognition.start();
  };

  handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/get-search?query=${this.state.searchQuery}`
      );
      const data = await response.data;
      this.setState({ searchResults: data });
    } catch (error) {
      console.error("Error searching doctors:", error);
    }
  };

  handleChange = async (event) => {
    const searchQuery = event.target.value;
    this.setState({ query: searchQuery });

    try {
      const response = await axios.get(
        `http://localhost:8080/api/get-search?query=${searchQuery}`
      );
      const data = response.data;
      this.setState({ searchResults: data });
    } catch (error) {
      console.error("Error searching doctors:", error);
    }
  };

  handleClickOutside = (event) => {
    const searchResultsContainer = document.querySelector(".search-results");

    if (
      !searchResultsContainer ||
      !searchResultsContainer.contains(event.target)
    ) {
      this.setState({ searchResults: [] });
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      this.handleSearch();
    }
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleLogin = () => {
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };

  handleViewListSpecialty = () => {
    this.props.history.push(`/list-specialty/chuyên khoa`);
  };

  handleViewListDoctor = () => {
    this.props.history.push(`/list-doctor`);
  };

  handleViewListClinic = () => {
    this.props.history.push(`/list-clinic`);
  };

  handleViewListHandBook = () => {
    this.props.history.push(`/list-handbook`);
  };

  handleLogout = () => {
    let { processLogout } = this.props;
    processLogout();
    if (processLogout) {
      this.props.history.push(`/login`);
    }
    this.setState({ user: "" });
  };

  render() {
    let { language } = this.props;
    let { searchResults, user } = this.state;

    const menuUser = (
      <Menu>
        <Menu.Item key="logout" onClick={this.handleLogout}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    );

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <MenuUnfoldOutlined className="icon" />
              <img
                className="header-logo"
                src={logo}
                onClick={() => this.returnToHome()}
              />
            </div>
            <Menu mode="horizontal" className="center-content">
              <Menu.Item
                key="speciality"
                className="child-content"
                onClick={this.handleViewListSpecialty}
              >
                <FormattedMessage id="homeheader.speciality" />
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </Menu.Item>
              <Menu.Item
                key="health-facility"
                className="child-content"
                onClick={this.handleViewListClinic}
              >
                <FormattedMessage id="homeheader.health-facility" />
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </Menu.Item>
              <Menu.Item
                key="doctor"
                className="child-content"
                onClick={this.handleViewListDoctor}
              >
                <FormattedMessage id="homeheader.doctor" />
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </Menu.Item>
              <Menu.Item
                key="handbook"
                className="child-content"
                onClick={this.handleViewListHandBook}
              >
                <FormattedMessage id="homepage.handbook" />
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-handbook" />
                </div>
              </Menu.Item>
            </Menu>
            <div className="right-content">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key="vi"
                      className={
                        language === LANGUAGES.VI
                          ? "language-vi active"
                          : "language-vi"
                      }
                      onClick={() => {
                        this.changeLanguage(LANGUAGES.VI);
                      }}
                    >
                      <img
                        width="24px"
                        height="24px"
                        src={vi}
                        style={{ marginRight: "7px" }}
                      />
                      Tiếng Việt
                    </Menu.Item>
                    <Menu.Item
                      key="en"
                      className={
                        language === LANGUAGES.EN
                          ? "language-en active"
                          : "language-en"
                      }
                      onClick={() => {
                        this.changeLanguage(LANGUAGES.EN);
                      }}
                    >
                      <img
                        width="24px"
                        height="24px"
                        src={en}
                        style={{ marginRight: "7px" }}
                      />
                      English
                    </Menu.Item>
                  </Menu>
                }
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {language === LANGUAGES.VI ? (
                    <img
                      width="24px"
                      height="24px"
                      src={vi}
                      style={{ marginRight: "7px" }}
                    />
                  ) : (
                    <img
                      width="24px"
                      height="24px"
                      src={en}
                      style={{ marginRight: "7px" }}
                    />
                  )}
                  {language === LANGUAGES.VI ? "VN" : "EN"}
                </a>
              </Dropdown>
              <Dropdown overlay={menuUser} placement="bottomRight">
                <a
                  className="name-patient ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="img-patient">
                    <img src={iconPatient} />
                  </div>
                  <div className="name-patient-child">{user}</div>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <div className="search-text">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder="Tìm kiếm"
                  />

                  <div className="search-results">
                    {searchResults.users && searchResults.users.length > 0 && (
                      <ul className="search-child">
                        <h2>Bác sĩ</h2>
                        <li>
                          {searchResults.users.map((user) => {
                            let imageBase64 = "";
                            if (user.image) {
                              imageBase64 = new Buffer(
                                user.image,
                                "base64"
                              ).toString("binary");
                            }
                            return (
                              <a href={`/detail-doctor/${user.id}`}>
                                <div
                                  className="search-img"
                                  style={{
                                    backgroundImage: `url(${imageBase64})`,
                                  }}
                                ></div>
                                {user.lastName} {user.firstName}
                              </a>
                            );
                          })}
                        </li>
                      </ul>
                    )}
                    {searchResults.clinics && searchResults.clinics.length > 0 && (
                      <ul className="search-child">
                        <h2>Cơ sở y tế</h2>
                        <li>
                          {searchResults.clinics.map((clinic) => {
                            let imageBase64 = "";
                            if (clinic.image) {
                              imageBase64 = new Buffer(
                                clinic.image,
                                "base64"
                              ).toString("binary");
                            }
                            return (
                              <a href={`/detail-clinic/${clinic.id}`}>
                                <div
                                  className="search-img"
                                  style={{
                                    backgroundImage: `url(${imageBase64})`,
                                  }}
                                ></div>
                                {clinic.name}
                              </a>
                            );
                          })}
                        </li>
                      </ul>
                    )}
                    {searchResults.specialties &&
                      searchResults.specialties.length > 0 && (
                        <div className="search-child">
                          <h2>Chuyên khoa</h2>
                          <li>
                            {searchResults.specialties.map((specialty) => {
                              let imageBase64 = "";
                              if (specialty.image) {
                                imageBase64 = new Buffer(
                                  specialty.image,
                                  "base64"
                                ).toString("binary");
                              }
                              return (
                                <a href={`/detail-specialty/${specialty.id}`}>
                                  <div
                                    className="search-img"
                                    style={{
                                      backgroundImage: `url(${imageBase64})`,
                                    }}
                                  ></div>
                                  {specialty.name}
                                </a>
                              );
                            })}
                          </li>
                        </div>
                      )}
                  </div>
                </div>
                <button className="search-voice" onClick={this.handleTalkClick}>
                  <i class="fa-solid fa-microphone"></i>
                </button>
              </div>
            </div>

            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-sharp fa-regular fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-microscope"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-tooth"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);

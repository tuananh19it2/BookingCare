import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./About.scss";
import logo from "../../../assets/about/vtv1.png";
import logo1 from "../../../assets/about/cuc-cong-nghe-thong-tin-bo-y-te-2.png";
import logo2 from "../../../assets/about/ictnews.png";
import logo4 from "../../../assets/about/suckhoedoisong.png";
import logo5 from "../../../assets/about/vnexpress.png";
import logo6 from "../../../assets/about/infonet.png";
import logo7 from "../../../assets/about/vtcgo.png";
import logo9 from "../../../assets/about/vtcnews.png";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-container">
          <div className="section-about-header">
            <FormattedMessage id="homepage.about" />
          </div>
          <div className="section-about-content">
            <div className="content-left-about">
              <iframe
                className="video"
                src="https://www.youtube.com/embed/WvjwH0fruNI"
                title="Khoa học kỹ thuật hỗ trợ dịch vụ y tế | VTV24"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <ul>
                <li>
                  <a>
                    <i
                      className="ds-logo logo4"
                      style={{
                        backgroundImage: `url(${logo4})`,
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i
                      className="ds-logo logo"
                      style={{
                        backgroundImage: `url(${logo})`,
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i
                      className="ds-logo logo2"
                      style={{
                        backgroundImage: `url(${logo2})`,
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i
                      className="ds-logo logo5"
                      style={{
                        backgroundImage: `url(${logo5})`,
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i
                      className="ds-logo logo9"
                      style={{
                        backgroundImage: `url(${logo9})`,
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i
                      className="ds-logo logo1"
                      style={{
                        backgroundImage: `url(${logo1})`,
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i
                      className="ds-logo logo6"
                      style={{
                        backgroundImage: `url(${logo6})`,
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i
                      className="ds-logo logo"
                      style={{
                        backgroundImage: `url(${logo})`,
                      }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i
                      className="ds-logo logo7"
                      style={{
                        backgroundImage: `url(${logo7})`,
                      }}
                    ></i>
                  </a>
                  <a>
                    <i
                      className="ds-logo logo"
                      style={{
                        backgroundImage: `url(${logo})`,
                      }}
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

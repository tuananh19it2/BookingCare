import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllIntroduction } from "../../../services/userService";
import "./Introduction.scss";
import { withRouter } from "react-router";

class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIntroduction: [],
    };
  }
  async componentDidMount() {
    let res = await getAllIntroduction();
    if (res && res.errCode === 0) {
      this.setState({
        dataIntroduction: res.data ? res.data : [],
      });
    }
  }

  render() {
    let { dataIntroduction } = this.state;
    return (
      <div className="section-share section-introduction">
        <div className="section-container">
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataIntroduction &&
                dataIntroduction.length > 0 &&
                dataIntroduction.map((item, index) => {
                  return (
                    <div className="section-customize introduction-child">
                      <a href={item.description} target="_blank">
                        <div
                          className="bg-image section-introduction-img"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div
                          className="introduction-name"
                          dangerouslySetInnerHTML={{
                            __html: item.descriptionHTML,
                          }}
                        ></div>
                        <button className="btn-introduction">
                          Xem chi tiết <i class="fa-solid fa-angles-right"></i>
                        </button>
                      </a>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Introduction)
);

import React, { Component } from "react";
import { getAllDoctors } from "../../../services/userService";
import { connect } from "react-redux";
import "./ListDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { HomeOutlined } from "@ant-design/icons";
import HomeFooter from "../../HomePage/HomeFooter";

class ListDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
    };
  }

  async componentDidMount() {
    let res = await getAllDoctors();
    if (res && res.errCode === 0) {
      this.setState({
        listDoctor: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailDoctor = (item) => {
    this.props.history.push(`/detail-doctor/${item.id}`);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    const { listDoctor } = this.state;

    return (
      <div className="window window-doctor">
        <div className="window-container">
          <div className="window-header">
            <HomeHeader />
          </div>
          <div className="window-content">
            <div className="content-header">
              <div className="hagtag">
                <button
                  className="icon-home"
                  onClick={() => this.returnToHome()}
                >
                  <HomeOutlined />
                </button>
                <span>Danh sách bác sĩ dành cho bạn</span>
              </div>
              <div className="content-name-header">
                Danh sách bác sĩ dành cho bạn
              </div>
            </div>
            {listDoctor &&
              listDoctor.length > 0 &&
              listDoctor.map((item, index) => {
                let name = `${item.positionData.valueVI}, ${item.lastName}  ${item.firstName}`;
                let nameClinic = `${item.doctorInfo.nameClinic}`;

                return (
                  <div
                    className="list-doctor"
                    onClick={() => this.handleViewDetailDoctor(item)}
                    key={index}
                  >
                    <div
                      className="image-doctor"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="name">
                      <p>{name}</p>
                      <span>{nameClinic}</span>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <HomeFooter />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);

import React, { Component } from "react";
import { getAllClinic } from "../../../services/userService";
import { connect } from "react-redux";
import "./ListClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { HomeOutlined } from "@ant-design/icons";
import HomeFooter from "../../HomePage/HomeFooter";

class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        listClinic: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    const { listClinic } = this.state;

    return (
      <div className="window window-doctor">
        <div className="window-container">
          <div className="window-header">
            <HomeHeader />
          </div>
          <div className="window-content-clinic">
            <div className="content-header-clinic">
              <div className="hagtag-clinic">
                <button
                  className="icon-home"
                  onClick={() => this.returnToHome()}
                >
                  <HomeOutlined />
                </button>
                <span>Tất cả cơ sở y tế</span>
              </div>
              <div className="content-name-header-clinic">Cơ sở y tế</div>
            </div>
            <div className="list-clinic-content">
              {listClinic &&
                listClinic.length > 0 &&
                listClinic.map((item, index) => {
                  return (
                    <div
                      className="list-clinic"
                      onClick={() => this.handleViewDetailClinic(item)}
                      key={index}
                    >
                      <div className="item-clinic">
                        <div
                          className="image-clinic"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="name">{item.name}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);

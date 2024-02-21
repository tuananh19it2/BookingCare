import React, { Component } from "react";
import { getAllSpecialty } from "../../../services/userService";
import { connect } from "react-redux";
import "./ListSpecialty.scss";

class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        listSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    const { listSpecialty } = this.state;
    return (
      <div className="window window-specialty">
        <div className="window-container">
          <div className="window-header">
            <button className="icon-back" onClick={() => this.returnToHome()}>
              <i class="fa-solid fa-arrow-left-long"></i>
            </button>
            <h5 className="name-header">Chuyên khoa</h5>
          </div>
          <div className="window-content">
            {listSpecialty &&
              listSpecialty.length > 0 &&
              listSpecialty.map((item, index) => {
                return (
                  <div
                    className="list-specialty"
                    onClick={() => this.handleViewDetailSpecialty(item)}
                    key={index}
                  >
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="name">{item.name}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);

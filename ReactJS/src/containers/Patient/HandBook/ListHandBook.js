import React, { Component } from "react";
import { getAllHandBook } from "../../../services/userService";
import { connect } from "react-redux";
import "./ListHandBook.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { HomeOutlined } from "@ant-design/icons";
import HomeFooter from "../../HomePage/HomeFooter";

class ListHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHandBook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandBook();
    if (res && res.errCode === 0) {
      this.setState({
        listHandBook: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailHandBook = (item) => {
    this.props.history.push(`/detail-handbook/${item.id}`);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    const { listHandBook } = this.state;

    return (
      <div className="window window-handbook">
        <div className="window-container">
          <div className="window-header">
            <HomeHeader />
          </div>
          <div className="section-share window-content">
            <div className="section-container">
              <div className="content-header">
                <div className="hagtag">
                  <button
                    className="icon-home"
                    onClick={() => this.returnToHome()}
                  >
                    <HomeOutlined />
                  </button>
                  <span>Bài viết nổi bật</span>
                </div>
                <div className="content-name-header">
                  Bài viết mới nhất dành cho bạn
                </div>
              </div>
            </div>
            {listHandBook &&
              listHandBook.length > 0 &&
              listHandBook.map((item, index) => {
                const description = item.descriptionHTML;
                const truncatedDescription = description.slice(0, 300) + "...";

                return (
                  <div className="section-container">
                    <div
                      className="list-handbook"
                      onClick={() => this.handleViewDetailHandBook(item)}
                      key={index}
                    >
                      <div
                        className="image-handbook"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="name">
                        <p className="name-child">{item.name}</p>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: truncatedDescription,
                          }}
                        ></span>
                      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListHandBook);

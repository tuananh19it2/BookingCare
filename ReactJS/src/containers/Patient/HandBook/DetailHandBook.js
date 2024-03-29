import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailHandBook.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailHandBookById } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import HomeFooter from "../../HomePage/HomeFooter";

class DetailHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailHandBook: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailHandBookById({
        id: id,
      });
      if (res && res.errCode === 0) {
        this.setState({
          dataDetailHandBook: res.data,
        });
      }
    }
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    let { dataDetailHandBook } = this.state;

    return (
      <div className="section-share section-detail-handbook">
        <HomeHeader />
        <div className="detail-handbook-header">
          <div className="section-container">
            <div className="hagtag">
              <button className="icon-home" onClick={() => this.returnToHome()}>
                <i class="fa-solid fa-house"></i>
              </button>
              <span>Cẩm nang</span>
              <span>Thông tin nổi bật</span>
            </div>
          </div>
        </div>
        <div className="section-container">
          <div className="detail-handbook-body">
            <div className="content-left-detail-handbook">
              <div className="content-child-left">
                {dataDetailHandBook && !_.isEmpty(dataDetailHandBook) && (
                  <>
                    <div className="detail-handbook-name">
                      {dataDetailHandBook.name}
                    </div>
                    <div
                      className="descriptionHTML"
                      dangerouslySetInnerHTML={{
                        __html: dataDetailHandBook.descriptionHTML,
                      }}
                    ></div>
                  </>
                )}
              </div>
            </div>
            <div className="content-right-detail-handbook">
              <div className="content-right-child">
                <h1>Bài viết liên quan</h1>
                <ul>
                  <li>
                    <a href="http://localhost:3000/detail-handbook/4">
                      Bệnh viện, phòng khám Tai Mũi Họng tốt quận Hai Bà Trưng
                    </a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/detail-handbook/5">
                      Bệnh viện, phòng khám tai mũi họng uy tín Quận Bình Tân
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Ù tai: Nguyên nhân, cách chữa trị, khám ở đâu tốt?
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Tai có nguy hiểm không? Triệu chứng và dấu hiệu nhận biết
                      nấm tai?
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Các bệnh về Tai thường gặp, phòng ngừa và cách điều trị
                    </a>
                  </li>
                  <li>
                    <a href="#"> Xử trí và phòng tránh mắc dị vật trong họng</a>
                  </li>
                </ul>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);

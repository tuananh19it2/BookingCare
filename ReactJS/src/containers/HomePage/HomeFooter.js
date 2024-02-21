import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeFooter.scss";
import logo from "../../assets/logo-top.png";
import imgdk from "../../assets/images/bo-cong-thuong.svg";
import imgdt1 from "../../assets/hellodoctor.png";
import imgdt2 from "../../assets/bernard.png";

class HomeFooter extends Component {
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    return (
      <div className="section-share section-footer">
        <div className="section-container">
          <div className="row">
            <div className="col-md-6 dia-chi">
              <div className="address">
                <img
                  className="logo-footer"
                  src={logo}
                  onClick={() => this.returnToHome()}
                />
                <h2>Công ty cổ phần công nghệ Medi</h2>
                <p>
                  <i className="fas fa-location-dot icon-footer"></i> Khu Đô thị
                  Đại học Đà Nẵng, Đường Nam Kỳ Khởi Nghĩa, quận Ngũ Hành Sơn,
                  TP. Đà Nẵng, Việt Nam
                </p>
                <p>
                  <i className="fas fa-check" icon-footer></i> ĐKKD số:
                  0106790321. Sở KHĐT Đà Nẵng cấp ngày 04/02/2019
                </p>
              </div>
              <div>
                <img src={imgdk} />
                <img src={imgdk} />
              </div>
              <div className="address-sau">
                <p style={{ fontWeight: "bold" }}>Văn phòng tại TP Đà Nẵng</p>
                <p>
                  Số 63, Nguyễn Minh Châu, Phường Hòa Quý, Quận Ngũ Hành Sơn
                </p>
              </div>
              <div className="address-sau">
                <p style={{ fontWeight: "bold" }}>Hỗ trợ khách hàng</p>
                <p>support@medi.vn (7h - 18h)</p>
              </div>
            </div>
            <div class="col-md-3 lien-he">
              <ul>
                <li>
                  <a href="#">Liên hệ hợp tác</a>
                </li>
                <li>
                  <a href="#">Danh bạ y tế</a>
                </li>
                <li>
                  <a href="#">Sức khỏe doanh nghiệp</a>
                </li>
                <li>
                  <a href="#">Gói chuyển đổi số doanh nghiệp</a>
                </li>
                <li>
                  <a href="#">Tuyển dụng</a>
                </li>
                <li>
                  <a href="#">Câu hỏi thường gặp</a>
                </li>
                <li>
                  <a href="#">Hướng dẫn sử dụng</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="#">Quy trình hỗ trợ giải quyết khiếu nại</a>
                </li>
                <li>
                  <a href="#">Quy chế hoạt động</a>
                </li>
              </ul>
            </div>
            <div class="col-md-3 doi-tac">
              <h4>Đối tác bảo trợ</h4>
              <ul>
                <li>
                  <a href="https://hellodoctors.vn/" target="_blank">
                    <img src={imgdt1} width="65px" height="40px" />
                    <div className="dt-detail">
                      <h4>Hello Doctor</h4>
                      <p>Bảo trợ chuyên mục nội dung “sức khỏe tinh thần”</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://bernard.vn/" target="_blank">
                    <img src={imgdt2} width="65px" height="65px" />
                    <div className="dt-detail">
                      <h4>Hệ thống y khoa chuyên sâu quốc tế Bernard</h4>
                      <p>Bảo trợ chuyên mục nội dung “y khoa chuyên sâu”</p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

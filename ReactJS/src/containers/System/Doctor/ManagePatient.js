import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
  deletePatientForDoctor,
} from "../../../services/userService";
import { FormattedDate } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date())
        .startOf("day")
        .valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = async (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.name,
    };

    let res = await postSendRemedy(data);
    if (res && res.errCode === 0) {
      toast.success("Confirmation succeed");
      await this.getDataPatient();
    } else {
      toast.error("Something wrongs...");
      console.log("Confirmation error:", res);
    }
  };

  handleDeletePatientForDoctor = async (patient) => {
    try {
      let res = await deletePatientForDoctor(patient.id);
      if (res && res.errCode === 0) {
        toast.success("Delete succeed");
        await this.getDataPatient();
      } else {
        toast.error("Something wrongs...");
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  // sendRemedy = async (dataChild) => {
  //   let { dataModal } = this.state;
  //   this.setState({
  //     isShowLoading: true,
  //   });
  //   let res = await postSendRemedy({
  //     email: dataChild.email,
  //     imgBase64: dataChild.imgBase64,
  //     doctorId: dataModal.doctorId,
  //     patientId: dataModal.patientId,
  //     timeType: dataModal.timeType,
  //     language: this.props.language,
  //     patientName: dataModal.patientName,
  //   });
  //   if (res && res.errCode === 0) {
  //     this.setState({
  //       isShowLoading: false,
  //     });
  //     toast.success("Send Remedy succeed:");
  //     this.closeRemedyModal();
  //     await this.getDataPatient();
  //   } else {
  //     this.setState({
  //       isShowLoading: false,
  //     });
  //     toast.error("Something wrongs...");
  //     console.log("error send remedy:", res);
  //   }
  // };

  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    console.log("dataModal", dataModal);
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lí bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group mb-4">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Số điện thoại</th>
                      <th>Lí do khám bệnh</th>
                      <th>Actions</th>
                    </tr>

                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVI
                            : item.timeTypeDataPatient.valueEN;

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.name}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.phoneNumber}</td>
                            <td>{item.patientData.reason}</td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác nhận
                              </button>
                              <button
                                className="mp-btn-delete"
                                onClick={() =>
                                  this.handleDeletePatientForDoctor(item)
                                }
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No data
                      </td>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          /> */}
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

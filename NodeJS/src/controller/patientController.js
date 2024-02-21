import patientService from "../services/patientService";
const ExcelJS = require("exceljs");
import db from "../models/index";

let handleRegister = async (req, res) => {
  let message = await patientService.handleRegister(req.body);
  console.log(message);
  return res.status(200).json(message);
};
let postBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let postVerifyBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postVerifyBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let exportExcelPatient = async (req, res) => {
  try {
    // Lấy dữ liệu từ cơ sở dữ liệu
    const patients = await db.Patient_Infor.findAll({
      attributes: [
        "id",
        "name",
        "address",
        "reason",
        "nameClinic",
        "nameSpecialty",
      ],
    });

    // Tạo một workbook mới
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Patients");

    // Đặt tên các cột trong worksheet
    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "Name", key: "name" },
      { header: "Address", key: "address" },
      { header: "Reason", key: "reason" },
      { header: "NameClinic", key: "nameClinic" },
      { header: "NameSpecialty", key: "nameSpecialty" },
    ];

    // Thêm dữ liệu từ cơ sở dữ liệu vào worksheet
    patients.forEach((patient) => {
      worksheet.addRow({
        id: patient.id,
        name: patient.name,
        address: patient.address,
        reason: patient.reason,
        nameClinic: patient.nameClinic,
        nameSpecialty: patient.nameSpecialty,
      });
    });

    // Tạo buffer từ workbook
    const buffer = await workbook.xlsx.writeBuffer();

    // Gửi file Excel cho client
    res.set("Content-Disposition", "attachment; filename=patients.xlsx");
    res.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Lỗi khi xuất Excel:", error);
    res.status(500).json({ error: "Lỗi khi xuất Excel" });
  }
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  exportExcelPatient: exportExcelPatient,
  handleRegister: handleRegister,
};

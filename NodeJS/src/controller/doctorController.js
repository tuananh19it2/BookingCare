import doctorService from "../services/doctorService";
import db from "../models/index";
const ExcelJS = require("exceljs");
const { Op } = require("sequelize");

let getSearchDoctor = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await db.User.findAll({
      where: {
        roleId: "R2",
        [Op.or]: [
          {
            firstName: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });

    const clinics = await db.Clinic.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    const specialties = await db.Specialty.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    res.json({
      users: users,
      clinics: clinics,
      specialties: specialties,
    });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "An error occurred while searching users" });
  }
};

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllDoctorForSearch = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return doctors;
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getExtraInfoDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getExtraInfoDoctorById(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProfileDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getListPatientForDoctor = async (req, res) => {
  try {
    let infor = await doctorService.getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleDeletePatientForDoctor = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await doctorService.deletePatientForDoctor(req.body.id);
  return res.status(200).json(message);
};

let sendRemedy = async (req, res) => {
  try {
    let infor = await doctorService.sendRemedy(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let exportExcelDoctor = async (req, res) => {
  try {
    // Lấy dữ liệu từ cơ sở dữ liệu
    const users = await db.User.findAll({
      where: { roleId: "R2" },
      attributes: ["id", "firstName", "lastName", "address", "image"],
      include: [
        {
          model: db.Doctor_Infor,
          as: "doctorInfo",
          attributes: ["nameClinic"],
          include: [
            {
              model: db.Specialty,
              as: "dataSpecialty",
              attributes: ["name"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });

    // Tạo một workbook mới
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Doctors");

    // Đặt tên các cột trong worksheet
    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "LastName", key: "lastName" },
      { header: "FirstName", key: "firstName" },
      { header: "Address", key: "address" },
      { header: "Clinic", key: "nameClinic" },
      { header: "Specialty", key: "name" },
      { header: "Image", key: "image" },
    ];

    // Thêm dữ liệu từ cơ sở dữ liệu vào worksheet
    users.forEach((user) => {
      const imageBinary = Buffer.from(user.image, "base64").toString("binary");
      worksheet.addRow({
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        address: user.address,
        nameClinic: user.doctorInfo.nameClinic,
        name: user.doctorInfo.dataSpecialty.name,
        image: imageBinary,
      });
    });

    // Tạo buffer từ workbook
    const buffer = await workbook.xlsx.writeBuffer();

    // Gửi file Excel cho client
    res.set("Content-Disposition", "attachment; filename=doctors.xlsx");
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
  getAllDoctorForSearch: getAllDoctorForSearch,
  getSearchDoctor: getSearchDoctor,
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctor: postInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInfoDoctorById: getExtraInfoDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
  handleDeletePatientForDoctor: handleDeletePatientForDoctor,
  exportExcelDoctor: exportExcelDoctor,
};

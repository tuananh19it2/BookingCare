import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import clinicController from "../controller/clinicController";
import handbookController from "../controller/handbookController";
import introductionController from "../controller/introductionController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/edit-user", userController.handleUpdateUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-info-doctor-by-id",
    doctorController.getExtraInfoDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.delete(
    "/api/delete-get-list-patient-for-doctor",
    doctorController.handleDeletePatientForDoctor
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.post("/api/send-remedy", doctorController.sendRemedy);
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );

  router.post(
    "/api/verify-book-appointment",

    patientController.postVerifyBookAppointment
  );

  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );

  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );

  router.post("/api/create-new-handbook", handbookController.createHandBook);
  router.get("/api/get-all-handbook", handbookController.getAllHandBook);
  router.get(
    "/api/get-detail-handbook-by-id",
    handbookController.getDetailHandBookById
  );

  router.post(
    "/api/create-new-introduction",
    introductionController.createIntroduction
  );
  router.get(
    "/api/get-all-introduction",
    introductionController.getAllIntroduction
  );
  router.get(
    "/api/get-detail-introduction-by-id",
    introductionController.getDetailIntroductionById
  );

  router.get("/api/get-search", doctorController.getSearchDoctor);
  router.get("/api/export-excel-doctor", doctorController.exportExcelDoctor);
  router.get("/api/export-excel-patient", patientController.exportExcelPatient);
  router.post("/api/register", patientController.handleRegister);

  return app.use("/", router);
};

module.exports = initWebRoutes;

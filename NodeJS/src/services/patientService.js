import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
const salt = bcrypt.genSaltSync(10);

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;

  return result;
};

let checkPatientEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = await db.Patient_Infor.findOne({
        where: { email: email },
      });
      if (patient) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let hashPatientPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWord = await bcrypt.hashSync(password, salt);

      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};

let handleRegister = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          errCode: 2,
          errMessage: `Please provide both email and password!`,
        });
      } else if (!data.name) {
        resolve({
          errCode: 3,
          errMessage: "What's your name?",
        });
      } else {
        let check = await checkPatientEmail(data.email);
        if (check === true) {
          resolve({
            errCode: 1,
            errMessage: `Your email is already in use. Please try another email!`,
          });
        } else {
          let hashPassWordFromBcrypt = await hashPatientPassword(data.password);
          await db.Patient_Infor.create({
            email: data.email,
            password: hashPassWordFromBcrypt,
            name: data.name,
            roleId: "R3",
          });
          resolve({
            errCode: 0,
            message: "Ok",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.name ||
        !data.address ||
        !data.selectedGender
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let token = uuidv4();

        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.name,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        // upsert patient
        // let user = await db.Patient_Infor.update(
        //   {
        //     email: data.email,
        //     name: data.name,
        //     address: data.address,
        //     reason: data.reason,
        //     nameClinic: data.nameClinic,
        //     nameSpecialty: data.nameSpecialty,
        //   },
        //   {
        //     where: { email: data.email },
        //   }
        // );
        // const user = await db.Patient_Infor.findOne({
        //   where: { email: data.email },
        //   raw: false,
        // });

        // if (user) {
        //   user.phoneNumber = data.phoneNumber;
        //   user.address = data.address;
        //   user.reason = data.reason;
        //   user.nameClinic = data.nameClinic;
        //   user.nameSpecialty = data.nameSpecialty;

        //   await user.save();
        // }

        // // create a booking record
        // if (user) {
        //   await db.Booking.findOrCreate({
        //     where: {
        //       patientId: user.id,
        //     },
        //     defaults: {
        //       statusId: "S1",
        //       patientId: user.id,
        //       doctorId: data.doctorId,
        //       date: data.date,
        //       timeType: data.timeType,
        //       token: token,
        //     },
        //   });
        // }
        const user = await db.Patient_Infor.findOne({
          where: { email: data.email },
          raw: false,
        });

        if (user) {
          user.email = data.email;
          user.name = data.name;
          user.phoneNumber = data.phoneNumber;
          user.address = data.address;
          user.reason = data.reason;
          user.nameClinic = data.nameClinic;
          user.nameSpecialty = data.nameSpecialty;

          await user.save();
        }

        // create a booking record
        if (user) {
          const existingBooking = await db.Booking.findOne({
            where: {
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
            },
          });

          if (existingBooking) {
            // Handle duplicate booking
            resolve({
              errCode: 1,
              errMessage: "Duplicate booking detected!",
            });
            // Handle the error or notify the user about the duplicate time slot
          } else {
            await db.Booking.create({
              statusId: "S1",
              patientId: user.id, // or user.patientId, depending on the structure of the object
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
              token: token,
            });
          }
        }
        resolve({
          errCode: 0,
          errMessage: "Save info patient succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  handleRegister: handleRegister,
  checkPatientEmail: checkPatientEmail,
  hashPatientPassword: hashPatientPassword,
};

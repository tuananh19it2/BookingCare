import db from "../models/index";

let createIntroduction = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.description
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.Introduction.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          description: data.description,
        });
        resolve({
          errCode: 0,
          errMessage: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllIntroduction = () => {
  return new Promise(async (resolve, reject) => {
    let data = await db.Introduction.findAll();
    try {
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errMessage: "Ok",
        errCode: 0,
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailIntroductionById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Introduction.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "descriptionHTML",
            "descriptionMarkdown",
            "description",
          ],
        });
        resolve({
          errMessage: "Ok",
          errCode: 0,
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createIntroduction: createIntroduction,
  getAllIntroduction: getAllIntroduction,
  getDetailIntroductionById: getDetailIntroductionById,
};

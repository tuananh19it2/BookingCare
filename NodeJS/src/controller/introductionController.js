import introductionService from "../services/introductionService";

let createIntroduction = async (req, res) => {
  try {
    let infor = await introductionService.createIntroduction(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllIntroduction = async (req, res) => {
  try {
    let infor = await introductionService.getAllIntroduction();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailIntroductionById = async (req, res) => {
  try {
    let infor = await introductionService.getDetailIntroductionById(
      req.query.id
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

module.exports = {
  createIntroduction: createIntroduction,
  getAllIntroduction: getAllIntroduction,
  getDetailIntroductionById: getDetailIntroductionById,
};

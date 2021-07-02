const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const mongoose = require("mongoose");

exports.deleteOne = (Model) => catchAsync(async (req, res) => {
  let doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError(`No ${Model} found with that id!`, 404));
  }

  return res.redirect(`/admin/${doc.collectionsName}?status=Success`);
});


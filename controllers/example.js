const Example = require('../models/example');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.getExample = catchAsyncErrors(async(req, res, next) => {
    const data = await Example.find();

    res.status(200).json({
        success: true,
        results: data.length,
        data: data
    });
});

exports.newExample = catchAsyncErrors(async(req, res, next) => {
    const ex = await Example.create(req.body);

    res.status(200).json({
        success: true,
        message: 'Created',
        data: ex
    });
});


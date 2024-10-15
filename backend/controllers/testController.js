const asyncHandler = require("express-async-handler");
const testQuery = require("../models/testQuery");


exports.getAllUsers = asyncHandler( async(req, res) => {
    const result = await testQuery.getAllUsers();
    console.log(result.data)
    if(result.data){
        return res.status(200).json(result.data)
    } else{
        return res.status(400).json({
            message: result.message,
            error: result.error,
        })
    }
})
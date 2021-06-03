const {User} = require("../models/userModel");
const bcrypt = require("bcrypt");


const Register = async (req, res) => {
  try {
      // const {image, fullName, userName, email, address, phone, password, role} 
      const request= req.body;
      const createdDate = new Date();

      if ( request.password )
      const hashString = await bcrypt.hashSync(request?.password, process.env.SALT);
      else res.status(400).json({ status: "fail", message: "Plz enter password !" });

      const initData = {
        image : request?.image,
        fullName: request?.fullName,
        userName: request?.userName,
        email: request?.email,
        address: request?.address,
        phone: request?.phone,
        password: hashString ? hashString : null,

      }

      const newUser = await User.create(initData);

      return {
        
      }


    const 
  } catch (e) {
    res.status(404).json({ status: "fail", message: e.message });
  }
};

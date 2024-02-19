// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'gg123';

const authMiddleware = async(req, res, next) => {
  const token = req.header('x-auth-token'); 
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    const user = await User.findById(req.user.id)
    if(user){
    next();
    }else{
        res.status(401).json({ success: false, message: 'Token is not valid' });

    }
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
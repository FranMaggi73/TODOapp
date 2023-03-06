import { validationResult } from "express-validator";

export default {
  handleErrors() {
    return async (req, res, next) => {
      const response = validationResult(req);
      const { errors } = response

      if(!response.isEmpty()){
        const errObj = {}
        for(let error of errors){
          errObj[error.param] = error.msg
        }

        return res.send({ errors : errObj });
      }

      next();
    };
  }
};
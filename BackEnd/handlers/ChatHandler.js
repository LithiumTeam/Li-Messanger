const ChatModel = require("../models/ChatModel.js");
const Joi = require("joi");

let chat_model = new ChatModel();

class ChatHandler {
  async CreatePrivateChat(req, res) {
    try {
	    let schema = {
		    target_user_id:Joi.number().required()
	    }
	    let check_data_joi = Joi.object(schema).validate(req.body);
	    if(check_data_joi.error){
		    res.status(400).send({check_data_joi.error.message});
	    }else{
		    let result = await chat_model.InsertPrivateChat(req.userData.id,req.body.target_user_id);
		    if(result.error){
    	     		res.status(500).send({ error: result.error });
		    }else{
			res.send({"status":"succses"});
		    }
	    }
    } catch (err) {
     	     console.log(err);
    	     res.status(500).send({ error: "there was a error" });
    }
  }
  
  async CreatePublicChat(req,res){
    try{
	    
    }catch(err){

    }
  }
}

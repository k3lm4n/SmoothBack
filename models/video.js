const mongoose = require("mongoose");
const Joi = require("joi");

const songSchema = new mongoose.Schema({
	name: { type: String, required: true },
	artist: { type: String, required: true },
	video: { type: String, required: true },
	img: { type: String, required: true },
	duration: { type: String, required: true },
});

const validate = (video) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		artist: Joi.string().required(),
		video: Joi.string().required(),
		img: Joi.string().required(),
		duration: Joi.number().required(),
	});
	return schema.validate(video);
};

const Video = mongoose.model("video", songSchema);

module.exports = { Video, validate };

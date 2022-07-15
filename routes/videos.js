const router = require("express").Router();
const { User } = require("../models/user");
const { Video, validate } = require("../models/video");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
// const multer =require("multer");
// const { StorageTrack } = require("../middleware/storage");

// const uploadTrack = multer({Storage: StorageTrack })

// Create video
router.post("/", admin, async (req, res) => {

	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const video = await Video(req.body).save();
	res.status(201).send({ data: video, message: "Video Adiconado Com sucesso" });
});

// Get all videos
router.get("/", async (req, res) => {
	const videos = await Video.find();
	res.status(200).send({ data: videos });
});

// Update video
router.put("/:id", [validateObjectId, admin], async (req, res) => {
	const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: video, message: "Video Actualizado Com sucesso" });
});

// Delete video by ID
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
	await Video.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Video Elimindo Com sucesso" });
});

// Like video
router.put("/like/:id", [validateObjectId, auth], async (req, res) => {
	let resMessage = "";
	const video = await Video.findById(req.params.id);
	if (!video) return res.status(400).send({ message: "Video nao existe" });

	const user = await User.findById(req.user._id);
	const index = user.likedVideos.indexOf(video._id);
	if (index === -1) {
		user.likedVideos.push(video._id);
		resMessage = "Video Adiconada aos favoritos";
	} else {
		user.likedVideos.splice(index, 1);
		resMessage = "Removeu a Video dos favoritos";
	}

	await user.save();
	res.status(200).send({ message: resMessage });
});

// Get liked videos
router.get("/like", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const videos = await Video.find({ _id: user.likedVideos });
	res.status(200).send({ data: videos });
});

module.exports = router;

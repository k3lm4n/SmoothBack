const router = require("express").Router();
const { User } = require("../models/user");
const { Song, validate } = require("../models/song");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
// const multer =require("multer");
// const { StorageTrack } = require("../middleware/storage");

// const uploadTrack = multer({Storage: StorageTrack })

// Create song
router.post("/", admin, async (req, res) => {

	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const song = await Song(req.body).save();
	res.status(201).send({ data: song, message: "Musica Adiconada Com sucesso" });
});

// Get all songs
router.get("/", async (req, res) => {
	const songs = await Song.find();
	res.status(200).send({ data: songs });
});

// Update song
router.put("/:id", [validateObjectId, admin], async (req, res) => {
	const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: song, message: "Musica Actualizada Com sucesso" });
});

// Delete song by ID
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
	await Song.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Musica Eliminda Com sucesso" });
});

// Like song
router.put("/like/:id", [validateObjectId, auth], async (req, res) => {
	let resMessage = "";
	const song = await Song.findById(req.params.id);
	if (!song) return res.status(400).send({ message: "Musica nao existe" });

	const user = await User.findById(req.user._id);
	const index = user.likedSongs.indexOf(song._id);
	if (index === -1) {
		user.likedSongs.push(song._id);
		resMessage = "Musica Adiconada aos favoritos";
	} else {
		user.likedSongs.splice(index, 1);
		resMessage = "Removeu a Musica dos favoritos";
	}

	await user.save();
	res.status(200).send({ message: resMessage });
});

// Get liked songs
router.get("/like", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const songs = await Song.find({ _id: user.likedSongs });
	res.status(200).send({ data: songs });
});

module.exports = router;

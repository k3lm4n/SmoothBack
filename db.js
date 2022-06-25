const mongoose = require("mongoose");

module.exports = async () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		await mongoose.connect(process.env.DB, connectionParams);
		console.log("Conectado");
	} catch (error) {
		console.log("Erro na Conexão", error);
	}
};

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res
			.status(400)
			.send({ message: "Acesso Negado" });

	jwt.verify(token, process.env.JWTPRIVATEKEY, (err, validToken) => {
		if (err) {
			return res.status(400).send({ message: "Token Invalido" });
		} else {
			req.user = validToken;
			next();
		}
	});
};

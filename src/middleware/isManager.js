const { Users } = require("../../prisma/conn");
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isManager = async (req = request, res = response, next) => {
	try {
		const authToken = await req.headers["authorization"];

		const token = await authToken.split(" ")[1];

		//check token
		const verify = await jwt.verify(token, process.env.SECRET_KEY);

		if (!verify) {
			return res.status(500).json({
				error: "token tidak terverifikasi",
			});
		}

		//check user
		const manager = await Users.findUnique({
			where: {
				nik: verify.user_nik,
			},
		});

		if (!manager) {
			return res.status(404).json({
				succes: false,
				message: "User tidak ditemukan",
			});
		}

		if (manager.role !== "MANAGER") {
			return res
				.status(403)
				.json({ msg: "Maaf anda tidak bisa mengakses halaman ini" });
		}

		// req body
		req.body = { ...req.body, ...verify };

		next();
	} catch (error) {
		res.status(500).json({
			succes: false,
			error: error.message,
		});
	}
};

module.exports = isManager;

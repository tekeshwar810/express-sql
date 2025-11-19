const db = require("../models");
const Comapaney = db.comapaney;
const CompaneyUser = db.companeyUser;
const { Op } = require('sequelize')
const { pagination } = require("../utils/pagination");

const addCompaney = async (req, res) => {
    try {
        const { companeyName, companeyEmail, companeyPhone, companeyAddress, companeyUsers,companeyDoc } = req.body;
        const companey = await Comapaney.create({
            companeyName,
            companeyEmail,
            companeyPhone,
            companeyAddress,
            companeyDoc,
            user: req.user.id,
        });

        let usersCreated = [];
        if (companeyUsers && Array.isArray(companeyUsers) && companeyUsers.length) {
            const usersPayload = companeyUsers.map((u) => ({ ...u, companeyId: companey.id }));
            usersCreated = await CompaneyUser.bulkCreate(usersPayload);
        }

        return res.status(201).send({ success: true, message: "Companey added successfully.", data: { companey, companeyUsers: usersCreated } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const getCompaney = async (req, res) => {
    try {
        const companey = await Comapaney.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: CompaneyUser,
                }
            ],
        });
        if (!companey) {
            return res.status(404).send({ success: false, message: "Companey not found." });
        }
        return res.status(200).send({ success: true, message: "Companey retrieved successfully.", data: companey });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const getAllCompaney = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const filter = {
            user: {
                [Op.eq]: req.user.id
            },
        }
        const condition = { ...filter }

        if (search) {
            condition.companeyName = { [Op.like]: `%${search.trim()}%` }
        }

        const paginate = pagination(page, limit)
        const companeyCount = await Comapaney.count({ where: filter })
        const companeys = await Comapaney.findAll({
            where: condition,
            include: [
                {
                    model: CompaneyUser,
                }
            ],
            order: [
                ['id', 'DESC'],
            ],
            offset: paginate.offset,
            limit: paginate.pageSize,
        });
        return res.status(200).send({ success: true, message: "Companeys retrieved successfully.", data: { count: companeyCount, rows: companeys } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const updateCompaney = async (req, res) => {
    try {
        const companeyId = req.params.id;
        const isExisting = await Comapaney.findOne({ where: { id: companeyId } });
        if (!isExisting) {
            return res.status(404).send({ success: false, message: "Companey not found." });
        }
        const { companeyName, companeyEmail, companeyPhone, companeyAddress, companeyUsers,companeyDoc } = req.body;


        const updateData = {};
        if (companeyName !== undefined) updateData.companeyName = companeyName;
        if (companeyEmail !== undefined) updateData.companeyEmail = companeyEmail;
        if (companeyPhone !== undefined) updateData.companeyPhone = companeyPhone;
        if (companeyAddress !== undefined) updateData.companeyAddress = companeyAddress;
        if (companeyDoc !== undefined) updateData.companeyDoc = companeyDoc;

        await Comapaney.update(updateData, { where: { id: req.params.id } });

        // Replace companey users if provided
        let usersCreated = [];
        if (companeyUsers && Array.isArray(companeyUsers)) {
            await CompaneyUser.destroy({ where: { companeyId: req.params.id } });
            if (companeyUsers.length) {
                const usersPayload = companeyUsers.map((u) => ({ ...u, companeyId: req.params.id }));
                usersCreated = await CompaneyUser.bulkCreate(usersPayload);
            }
        }

        const updated = await Comapaney.findOne({ where: { id: req.params.id }, include: [CompaneyUser] });
        return res.status(200).send({ success: true, message: "Companey updated successfully.", data: { companey: updated, companeyUsers: usersCreated } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const deleteCompaney = async (req, res) => {
    try {
        await CompaneyUser.destroy({ where: { companeyId: req.params.id } });
        const deleted = await Comapaney.destroy({ where: { id: req.params.id } });
        return res.status(200).send({ success: true, message: "Companey deleted successfully.", data: deleted });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

const uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'File is required and must be a CSV or PDF.' });
        const file = req.file;
        // const fileUrl = `http://${process.env.HOST}:${process.env.PORT}/${file.filename}`;
        const fileUrl = `/${file.filename}`;
        return res.status(201).json({ success: true, message: 'File uploaded successfully.', data: { file: { originalname: file.originalname, filename: file.filename, mimetype: file.mimetype, size: file.size }, url: fileUrl } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}

const uploadImages = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'Image is required and must be jpeg , png' });
       const file = req.file;
       
        const fileUrl = `/${file.filename}`;
        return res.status(201).json({ success: true, message: 'Image uploaded successfully.', data: { file: { originalname: file.originalname, filename: file.filename, mimetype: file.mimetype, size: file.size }, url: fileUrl } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error.' })
    }
}
module.exports = { addCompaney, getAllCompaney, updateCompaney, getCompaney, deleteCompaney, uploadFile, uploadImages }
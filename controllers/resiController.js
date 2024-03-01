const Resi = require("../models/Resi");

const getResi = async (req, res) => {
  try {
    const resi = await Resi.find();
    res.json(resi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResiByNoResi = async (req, res) => {
  try {
    const resi = await Resi.findOne({ noResi: req.params.id });
    if (!resi) {
      return res.status(404).json({ message: "Resi tidak ditemukan" });
    }
    res.json(resi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNewResi = async (req, res) => {
  const { noResi, name, telp, vendor } = req.body;
  const photo = req.file.filename;

  if (!noResi || !name || !telp || !vendor || !photo) {
    return res.status(400).json({ message: "Isi semua field" });
  }

  const resiObject = {
    noResi,
    name,
    telp,
    vendor,
    photo: `/assets/${photo}`,
  };

  const resi = Resi.create(resiObject);

  if (resi) {
    res.status(201).json({ message: "Resi berhasil ditambahkan" });
  } else {
    res.status(400).json({ message: "Gagal menambahkan resi" });
  }
};

const terimaResi = async (req, res) => {
  const { noResi } = req.body;
  const isAccepted = true;

  try {
    const resi = await Resi.findOne({ noResi });
    if (!resi) {
      return res.status(404).json({ message: "Resi tidak ditemukan" });
    }
    await Resi.updateOne({ noResi }, { isAccepted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getResi,
  getResiByNoResi,
  createNewResi,
  terimaResi,
};
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
  const photo = req.file;

  if (!noResi || !name || !telp || !vendor || !photo) {
    return res.status(400).json({ message: "Isi semua field" });
  }

  if (photo.size > 10 * 1024 * 1024) {
    return res.status(400).json({ message: "Ukuran maksimal gambar 10MB" });
  }

  const resi = await Resi.findOne({ noResi });
  if (resi) {
    return res
      .status(400)
      .json({ message: "Telah terdapat nomor resi yang sama" });
  }

  const resiObject = {
    noResi,
    name,
    telp,
    vendor,
    photo: `/assets/${photo.filename}`,
  };

  const newResi = Resi.create(resiObject);

  if (newResi) {
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
    if (resi.isAccepted) {
      return res.status(400).json({ message: "Resi sudah diterima" });
    }
    const newResi = await Resi.findOneAndUpdate({ noResi }, { isAccepted });
    if (newResi) {
      res.status(200).json({ message: "Resi berhasil diterima" });
    }
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

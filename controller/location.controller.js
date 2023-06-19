const multer = require('multer');
const Location = require('../model/location.model');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
	}
});

const upload = multer({ storage: storage });

module.exports.getAllLocations = async (req, res) => {
	try {
		const locationList = await Location.find();
		res.json({ locations: locationList });
	} catch (error) {
		res.status(500).json({
			message: 'No hemos podido enviar las ubicaciones',
			error,
		});
	}
};

module.exports.createLocation = async (req, res) => {
	try {
		upload.single('image')(req, res, async (err) => {
			try {
				const newLocation = await Location.create({
					...req.body,
					image: req.file.filename
				});
				res.json({ location: newLocation });
			} catch (error) {
				res.status(500).json({
					message: 'No hemos podido crear una nueva ubicación',
					error
				});
			}
		});
	} catch (error) {
		res.status(500).json({
			message: 'No hemos podido crear una nueva ubicación',
			error
		});
	}
};

module.exports.updateLocation = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Error al cargar la imagen',
          error: err,
        });
      }

      try {
        const updatedFields = {
          ...req.body,
        };

        if (req.file) {
          updatedFields.image = req.file.filename;
        }

        const updatedLocation = await Location.findByIdAndUpdate(
          req.params.id,
          updatedFields,
          { new: true }
        );

        res.json({ location: updatedLocation });
				
      } catch (error) {
        res.status(500).json({
          message: 'No hemos podido actualizar la ubicación',
          error,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'No hemos podido actualizar la ubicación',
      error,
    });
  }
};


module.exports.deleteLocation = async (req, res) => {
	try {
		const response = await Location.deleteOne({ _id: req.params.id });
		res.json({ response });
	} catch (error) {
		res.status(500).json({
			message: 'No hemos podido eliminar la ubicación',
			error,
		});
	}
}

module.exports.getOneLocation = async (req, res) => {
	try {
		const oneLocation = await Location.findById(req.params.id)
		res.json({ location: oneLocation });
	} catch (error) {
		res.status(500).json({
			message: 'No hemos podido encontrar la ubicación',
			error,
		});
	}
}

const Location = require('../model/location.model');

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
        const newLocation = await Location.create(req.body);
        res.json({ location: newLocation });
    } catch (error) {
        res.status(500).json({
            message: 'No hemos podido crear una nueva ubicación',
            error,
        });
    }
}

module.exports.updateLocation = async (req, res) => {
    try {
        const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ location: updatedLocation });
    } catch (error) {
        res.status(500).json({
            message: 'No hemos podido actualizar la ubicación',
            error,
        });
    }
}

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



















// const Location = require('../model/location.model');
// const express = require("express");
// const app = express();
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/'); // Ruta donde se guardarán los archivos subidos
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo guardado
//     }
// });
// const upload = multer({ storage: storage });
// app.use(express.static('./uploads/'));

// // const multer = require('multer');
// // const upload = multer ({dest: './uploads/'});



// module.exports.getAllLocations = async (req, res) => {
//   try {
//     const locationList = await Location.find();
//     res.json({ locations: locationList });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido enviar las ubicaciones',
//       error,
//     });
//   }
// };

// module.exports.createLocation = async (req, res) => {
//   try {
//     upload.single('image')(req, res, async (err) => {

//       if (err) {
//         return res.status(500).json({
//           message: 'Error al cargar la imagen',
//           error: err
//         });
//       }

//       try {
//         const newLocation = await Location.create({
//           ...req.body,
//           image: req.file ? req.file.path : '' // Guarda la ruta del archivo en el campo image
//             // image: req.file.path
//         });
//         res.json({ location: newLocation });
//         console.log("req.file: ", req.file)
//       } catch (error) {
//         res.status(500).json({
//           message: 'No hemos podido crear una nueva ubicación',
//           error
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido crear una nueva ubicación',
//       error
//     });
//   }
// };

// module.exports.updateLocation = async (req, res) => {
//   try {
//     upload.single('image')(req, res, async (err) => {
//       if (err) {
//         return res.status(500).json({
//           message: 'Error al cargar la imagen',
//           error: err
//         });
//       }

//       try {
//         const updatedLocation = await Location.findByIdAndUpdate(
//           req.params.id,
//           {
//             ...req.body,
//             image: req.file ? req.file.path : '' // Guarda la ruta del archivo en el campo image
//           },
//           { new: true }
//         );
//         res.json({ location: updatedLocation });
//       } catch (error) {
//         res.status(500).json({
//           message: 'No hemos podido actualizar la ubicación',
//           error
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido actualizar la ubicación',
//       error
//     });
//   }
// };

// module.exports.deleteLocation = async (req, res) => {
//   try {
//     const response = await Location.deleteOne({ _id: req.params.id });
//     res.json({ response });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido eliminar la ubicación',
//       error
//     });
//   }
// };

// module.exports.getOneLocation = async (req, res) => {
//   try {
//     const oneLocation = await Location.findById(req.params.id)
//     res.json({ location: oneLocation });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido encontrar la ubicación',
//       error
//     });
//   }
// };






// const Location = require('../model/location.model');
// const express = require("express");
// const app = express();

// const multer = require('multer');
// const upload = multer ({dest: './uploads/'});
// const fs = require('fs');
// app.use(express.static('./uploads/'));


// module.exports.getAllLocations = async (req, res) => {
//   try {
//     const locationList = await Location.find();
//     res.json({ locations: locationList });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido enviar las ubicaciones',
//       error,
//     });
//   }
// };

// module.exports.createLocation = async (req, res) => {
//   try {
//     upload.single('image')(req, res, async (err) => {
//         let fileType = req.file.mimetype.split("/")[1];
//         console.log("fileType", fileType);
//         let newFileName = req.file.filename + "." + fileType;
//         console.log("newFileName", newFileName);
//         fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, function(){
//             console.log("callback");
//             res.send("200")
//         })
//       try {
//         const newLocation = await Location.create({
//           ...req.body,
//           image: req.file ? req.file.path : '' // Guarda la ruta del archivo en el campo image
//             // image: req.file.path
//         });
//         res.json({ location: newLocation });
//         console.log("req.file: ", req.file)
//       } catch (error) {
//         res.status(500).json({
//           message: 'No hemos podido crear una nueva ubicación',
//           error
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido crear una nueva ubicación',
//       error
//     });
//   }
// };

// module.exports.updateLocation = async (req, res) => {
//   try {
//     upload.single('image')(req, res, async (err) => {
//       if (err) {
//         return res.status(500).json({
//           message: 'Error al cargar la imagen',
//           error: err
//         });
//       }

//       try {
//         const updatedLocation = await Location.findByIdAndUpdate(
//           req.params.id,
//           {
//             ...req.body,
//             image: req.file ? req.file.path : '' // Guarda la ruta del archivo en el campo image
//           },
//           { new: true }
//         );
//         res.json({ location: updatedLocation });
//       } catch (error) {
//         res.status(500).json({
//           message: 'No hemos podido actualizar la ubicación',
//           error
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido actualizar la ubicación',
//       error
//     });
//   }
// };

// module.exports.deleteLocation = async (req, res) => {
//   try {
//     const response = await Location.deleteOne({ _id: req.params.id });
//     res.json({ response });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido eliminar la ubicación',
//       error
//     });
//   }
// };

// module.exports.getOneLocation = async (req, res) => {
//   try {
//     const oneLocation = await Location.findById(req.params.id)
//     res.json({ location: oneLocation });
//   } catch (error) {
//     res.status(500).json({
//       message: 'No hemos podido encontrar la ubicación',
//       error
//     });
//   }
// };



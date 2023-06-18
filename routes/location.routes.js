const { authenticate } = require("../config/jwt.config");
const { getAllLocations, createLocation, updateLocation, deleteLocation, getOneLocation } = require("../controller/location.controller");


module.exports = (app) => {
    app.get('/api/location', getAllLocations);
    app.get('/api/location/:id', getOneLocation);
    app.post('/api/location', createLocation);
    app.put('/api/location/:id', updateLocation);
    app.delete('/api/location/:id', deleteLocation);
}
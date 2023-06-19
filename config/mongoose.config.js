const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/project_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('We are making some connections!'))
    .catch(err => console.log('Somenthing went wrong', err));

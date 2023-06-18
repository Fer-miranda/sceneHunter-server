const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('We are making some connections!'))
    .catch(err => console.log('Somenthing went wrong', err));

const { Schema, model } = require('mongoose');

const LocationSchema = new Schema({
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
  category: {
    type: String,
    enum: ['Movies', 'Series', 'Music videos'],
    required: [true, "Category is required"],
  },
  name: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be al least 3 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [3, "Description must be al least 5 characters"],
    maxlength: [100, "Description must have a maximum of 100 characters"]
  },
  lat : {
    type : Number,
    required : true,
  },

  lon : {
      type : Number,
      required : true
  },
  // LA IDEA ES QUE EL USUARIO SUBA UNA FOTO Y LUEGO DE CREAR EL PIN LA IMAGEN SE MUESTRE
  image: {
    type: String,
    // required: [true, "Image is required"],
  },
}, { timestamps: true });

LocationSchema.add({
  wishList: {
    type: Boolean,
    default: false
  }
});

const Location = model('Location', LocationSchema);

module.exports = Location;


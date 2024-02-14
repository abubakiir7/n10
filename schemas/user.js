const { Schema, model } = require("mongoose");

function getSalary(salary) {
  return (salary / 100).toFixed(2);
}
function setSalary(salary) {
  return salary * 100;
}

const userSchema = new Schema(
  {
    user_name: { type: String, required: true, trim: true, uppercase: true },
    user_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Iltimos emailni to'gri kiriting",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Parol juda qisqa"],
      maxLength: [20, "Parol juda uzun"],
    },
    age: {
      type: Number,
      min: [18, "18 yoshdan katta bo'lishi kerak"],
      max: [70, "70 yoshdan kichik bo'lishi kerak"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "transgender", "gey", "custom"],
      message: `{VALUE} noto'g'ri`,
    },
    isMarried: Boolean,
    wife: {
      type: Object,
      required: () => this.isMarried,
      name: {
        type: String,
        trim: true,
      },
      age: {
        type: Number,
        min: 12,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: (val) => /\d{2}-\d{3}-\d{2}-\d{2}/.test(val),
        message: (props) => props.value + " - raqam noto'g\ri",
      },
      maxLength: 12,
    },
    salary: {
      type: Number,
      set: setSalary,
      get: getSalary,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { getters: true },
  }
);

userSchema.statics.findByName = function (name) {
  return this.find({ user_name: new RegExp(name, "i") });
};
userSchema.query.byName = function (name) {
  return this.where({ user_name: new RegExp(name, "i") });
};

userSchema.set("validateBeforeSave", false)
userSchema.pre("validate", () => console.log(""))

module.exports = model("User", userSchema);

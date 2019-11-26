const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Invalid format: email',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Invalid format: email or password. 1'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Invalid format: email or password. 2'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

// email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное
// для каждого пользователя. Также оно должно валидироваться на соответствие схеме электронной
//  почты.
// password — хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию, чтобы
//  база данных не возвращала это поле.
// name — имя пользователя, например: Александр или Мария. Это обязательное поле-строка от 2 до
//  30 символов.

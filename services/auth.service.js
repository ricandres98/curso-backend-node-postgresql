const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

const { config } = require('../config/config');
const UsersService = require('./users.service');

const userService = new UsersService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token,
    };
  }


  async sendRecovery(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id
    }

    const token =  jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    await userService.update(user.id, {recoveryToken: token});

    const link = `http://myfrontend.com/recovery?token=${token}`

    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`
    }

    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);
      if (user.dataValues.recoveryToken !== token) {
        throw boom.unauthorized('Token is not matching');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await userService.update(user.id, { recoveryToken: null, password: hash});

      return { message: 'password changed'};

    } catch (error) {
      throw boom.unauthorized(error);
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'mail sent' };
  }
}

module.exports = AuthService;

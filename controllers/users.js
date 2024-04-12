const {prisma} = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/user/login
 * @desc login
 * @access Public
 */

const { Prisma } = require("@prisma/client/edge");


const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email && !password) {
      return res.status(400).json({message: 'Пожалуйстаб заполните обязятельные поля'})
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });

    const isPasswordCorrect = user && (await brypt.compare(password, user.password));

    if(user && isPasswordCorrect) {
       res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
       })
    } else {
        return res.status(400).json({message: 'Неверно введен логин или пароль'})
    }
  };


/**
 * 
 * @route Post /api/user/register
 * @desc register
 * @access Public
 */

const register = async (req, res) => {
    res.send('register');
  };
const current = async (req, res) => {
    res.send('current');
  };

  module.exports = {
    login,
    register,
    current
  }
 
const mysql=require('mysql2');

const Sequelize=require('sequelize');

const sequelize=new Sequelize('mangement','root','password',
{dialect:'mysql',
host:'localhost'});

module.exports=sequelize;   

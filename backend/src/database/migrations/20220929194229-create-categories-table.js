'use strict';
//Aqui será para alterar o banco de dados, é separado em dois tipos, o primeiro chamado up, para alterar o banco de dados e o segundo down, para alterar o banco de dados.
module.exports = {
  async up (queryInterface, Sequelize) {

    //Aqui vamos criar a tabela, denominada por categorias e as propriedades que a tabela deve ter.
    // AllowNull, isso significa que todos os campos são obrigatorios
    // AutoIncrement, para saber se vai ser gerado automaticamente.
    // PrimaryKey, para termos uma chave primaria no tipo id.
    // Type, o tipo de dado que vamos receber no banco de dados.
    // Unique, que terá somente uma posição.
    await queryInterface.createTable('categories', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name:{
        allowNull:false,
        type: Sequelize.DataTypes.STRING
      },
      position:{
        allowNull:false,
        type: Sequelize.DataTypes.INTEGER
      },
      created_at:{
        allowNull:false,
        type: Sequelize.DataTypes.DATE
      }, 
      updated_at:{
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categories')
  }
};

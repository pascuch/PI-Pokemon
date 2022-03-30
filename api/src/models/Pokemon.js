const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    

// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi ----
// Nombre * ---- name
// Vida ---- stats -> stat -> name: hp
// Fuerza ---- stats -> stat -> name: attack
// Defensa ---- stats -> stat -> name: defense
// Velocidad ---- stats -> stat -> name: speed
// Altura ---- height
// Peso ---- weight
  });
};
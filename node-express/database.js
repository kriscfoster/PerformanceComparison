import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
);

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
});

export default {
  sequelize: sequelize,
  Book: Book,
};

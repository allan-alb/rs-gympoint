module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

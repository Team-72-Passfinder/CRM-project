//Require to have these value in .env file at root folder

let config = {
  dbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};

module.exports = config;

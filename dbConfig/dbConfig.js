module.exports = {
    HOST: 'localhost',
    USER: 'pallavkumar',
    PASSWORD: 'Nokiaasha230!',
    DB: 'project',
    dialect: 'postgres',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
};
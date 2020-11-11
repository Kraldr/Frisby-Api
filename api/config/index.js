process.env.NODE_ENV = process.env.NODE_ENV || "dev";
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'dev') {
    process.env.USER_DB = "postgres";
    process.env.HOST_DB = "localhost";
    process.env.DB = "Frisby-Api"
    process.env.PASSWORD_DB = "123";
    process.env.PORT_DB = 5432;
}else if (process.env.NODE_ENV == 'production') {
    process.env.USER_DB = "";
    process.env.HOST_DB = "";
    process.env.DB = ""
    process.env.PASSWORD_DB = "";
    process.env.PORT_DB = 5432;
}


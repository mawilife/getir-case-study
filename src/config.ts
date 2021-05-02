require("dotenv").config();

export const DBConfig = Object.seal({
    connectionString: process.env.MONGO_DB_CONNECTION_STRING || "",
});

export const CommonConfig = Object.seal({
    port: parseInt(process.env.PORT || "8181"),
})
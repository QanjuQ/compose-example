const getEnv = (property, defaultValue) => process.env[property] || defaultValue;

module.exports = {
    db: {
        url: getEnv("DB_URL", "mongodb://localhost:27017"),
        name: getEnv("DB_NAME", "mathkiya")
    },
    port: getEnv('PORT', 8001)
}

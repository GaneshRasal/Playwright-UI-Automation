module.exports = {
    default: {
        require: [
            "utils/world.js",
            "step-definitions/*.js"
        ],
        format: ["progress"],
        paths: ["features/*.feature"]
    }

}
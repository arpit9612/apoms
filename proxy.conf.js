const PROXY_CONFIG = [
    {
        context: [
            "/Auth",
            "/Case",
            "/EmergencyRegister",
            "/Health",
            "/Caller"
        ],
        target: "http://localhost:8080",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware");
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cookie_parser_1.default)(process.env.COOKIE_KEY));
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321',
    credentials: true
}));
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server');
});
app.get('/api/test', (req, res) => {
    res.cookie('authToken', true, {
        httpOnly: true,
        maxAge: 3 * 60 * 1000,
        signed: true
    });
    res.status(200).json({
        connected: true
    });
});
app.get('/api/protected', middleware_1.checkAuth, (req, res) => {
    res.json({ username: 'john' });
});
// Start server
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

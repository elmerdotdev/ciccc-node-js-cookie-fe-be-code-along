"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { authToken } = req.signedCookies;
    if (authToken) {
        next();
    }
    else {
        res.status(401).json({
            message: 'You are not allowed to view this page'
        });
    }
};
exports.checkAuth = checkAuth;

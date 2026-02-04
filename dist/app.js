"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// our own mvc file imports
const booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
// create & start new express app
const app = (0, express_1.default)();
// app config
app.use(body_parser_1.default.json());
// db connection
mongoose_1.default.connect(process.env.DB, {})
    .then((response) => console.log('Connected to MongoDB'))
    .catch((error) => console.log(`Connection Error: ${error}`));
app.listen(4000, () => { console.log('Express API running on port 4000'); });
// map url's based on resource names to corresponding routers
app.use('/api/v1/books', booksRoutes_1.default);

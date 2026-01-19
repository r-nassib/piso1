import { createApp } from "./app";
import { logger } from "../../infrastructure/logger";

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
    logger.info(`Search-service escuchando en puerto ${PORT}`);
});
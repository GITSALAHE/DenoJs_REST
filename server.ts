import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./app/routes/routes.ts";
const PORT = 4000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening on ${PORT}`);

await app.listen({ port: PORT });
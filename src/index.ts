import { SuperStafflist } from "./Client";
import "dotenv/config";

const client = new SuperStafflist();

export default client;
    
(async () => {
    await client.start();
})();  
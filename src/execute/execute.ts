import Connect from "./connect";
import { ConnectConfig, DbConnect } from "../constant/execute/interface";

class Execute extends Connect {
    constructor(config: ConnectConfig) {
        super(config);
    }
    async run(query: string) {
        const dbConnection = await this.getDbConnect();
        return new Promise((relsove, reject) => {
            (<DbConnect>dbConnection).query(query, function(err, results) {
                (<DbConnect>dbConnection).release();
                if (err) {
                    reject(err);
                }
                relsove(results);
            });
        });
    }
}

export default Execute;

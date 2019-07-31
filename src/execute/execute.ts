import Connect from "./connect";
import { ConnectConfig } from "../constant/execute/interface";

class Execute extends Connect {
    constructor(config: ConnectConfig) {
        super(config);
    }
    do(query: string) {
        const dbConnection = this.getDbConnect();
        return new Promise((relsove, reject) => {
            dbConnection.query(query, function(err, results) {
                if (err) {
                    reject(err);
                }
                relsove(results);
            });
        });
    }
}

export default Execute;

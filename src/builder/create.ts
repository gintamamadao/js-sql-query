import Safe from "./safe";

class Create extends Safe {
    protected queryTable: string;
    constructor() {
        super();
        this.queryTable = "";
    }
}

export default Create;

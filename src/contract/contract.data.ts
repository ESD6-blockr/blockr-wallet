export class ContractData {
    private functionName: string;
    private functionParameters: Map<string, string>;
    private classTemplate?: string;

    constructor() {
        this.functionName = "";
        this.functionParameters = new Map();
    }

    public fillData(functionName: string, parameterArray: Map<string, string>, classTemp: any) {
        this.functionName = functionName;
        this.functionParameters = parameterArray;
        this.classTemplate = classTemp;
    }

    public fillFunction(functionName: string, parameterArray: Map<string, string>) {
        this.functionName = functionName;
        this.functionParameters = parameterArray;
    }
}

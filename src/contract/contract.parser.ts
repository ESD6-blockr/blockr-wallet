import { ContractData } from "./contract.data";

export class JsonContractParser {
    public parse(json: string) {
        const parsed = JSON.parse(json);
        const functions = parsed.functions;
        const functionJson: string[] = [];
        for (const i of functions) {
            const func = i;

            const functionName = func.functionName;
            const params = func.parameters;
            // functionJson.push(this.parseFunctionContract(functionName, params));
        }
        return functionJson;
    }

    public getMethods() {
        // TODO: Get from API
        return null;
        // const parsed = JSON.parse(this.jsonInput);
        // const functions = parsed.functions;

        // const methods = new Map<string, Map<string, any>>();
        // for (let i = 0; i < functions.length; i++) {
        //     const func = functions[i];
        //     const functionName = func.functionName;
        //     const p = func.parameters;
        //     const params = new Map<string, any>();

        //     for (let j = 0; j < p.length; j++) {
        //         params.set(p[j], "");
        //     }

        //     methods.set(functionName, params);
        // }
        // return methods;
    }

    public parseConstructorContract(
        functionName: string,
        params: Map<string, string>,
        constructorParams: Map<string, string>,
        contract: any,
    ) {
        const constructorData = new ContractData();
        const contractData = new ContractData();

        constructorData.fillFunction("constructor", constructorParams);
        contractData.fillFunction(functionName, params);

        const json = {
            classTemplate: contract,
            constructor: constructorData,
            function: contractData,
        };

        // log every individual piece to look for /undefined/
        // console.log("Full contract data array: ", contractData);
        // console.log("Contract template: ", contract);
        // console.log(json);

        return JSON.stringify(json);
    }

    public parseFunctionContract(
        functionName: string,
        params: Map<string, string>,
        constructorParams: Map<string, string>,
        contract: any,
    ) {
        const constructorData = new ContractData();
        const contractData = new ContractData();

        constructorData.fillFunction("constructor", constructorParams);
        contractData.fillFunction(functionName, params);

        const json = {
            classTemplate: contract,
            constructor: constructorData,
            function: contractData,
        };

        // log every individual piece to look for /undefined/
        // console.log("Full contract data array: ", contractData);
        // console.log("Contract template: ", contract);
        // console.log(json);

        return JSON.stringify(json);
    }
}

import { ContractMockData } from "../contract/contract.mock";
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

    public getMockMethods() {
        return this.getMethodsFromParsed(new ContractMockData().mockContractMethods);
    }

    public getMethods(text: string) {
        const parsed = JSON.parse(text);
        return this.getMethodsFromParsed(parsed);
    }

    /**
     *
     * @param json Json is used to get methods from. Should already be parsed
     */
    public getMethodsFromParsed(parsed: any) {
        const constructor = parsed.constructor;
        const constructorParams = constructor.functionParameters;
        const template = parsed.classTemplate.contract;
        const functions = parsed.functions;

        const methods = new Map<string, Map<string, any>>();
        for (const func of functions) {
            const functionName = func.functionName;
            const functionParameters = func.parameters;
            let params = new Map<string, any>();

            if (functionName === "constructor") {
                params = constructorParams;
            } else {
                // Give all params empty values
                for (const functionParameter of functionParameters) {
                    params.set(functionParameter, "");
                }
            }

            methods.set(functionName, params);
        }

        const methodsTemp = {
            classTemplate: template,
            methods,
        };

        return methodsTemp;
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

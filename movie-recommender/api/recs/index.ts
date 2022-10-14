import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const url = "https://corymcc-movie4.westcentralus.inference.ml.azure.com/score";
const api_key = "me0FL322gQVsGZjHM1SodZDsKp34BHvk";

type RatingsCollection = { [K in string]: number };

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

function isRatingsCollection(arg: any): arg is RatingsCollection {
    return Object.entries(arg).every(entry => typeof (entry[0]) === "string" && typeof (entry[1]) === "number");
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try {
        const {data} = JSON.parse(JSON.stringify(req.body) || "{}");
        if (!isRatingsCollection(data)) {
            throw new Error(`Malformed payload - expected a dictionary of <string:number> entries by received: ${JSON.stringify(data)}`);
        }
        const resp = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ('Bearer ' + api_key),
                'azureml-model-deployment': 'default'
            }
        });
        context.log("Recieved response from endpoint: ", resp);
        context.res = {
            status: resp.status,
            body: resp.data
        };
    } catch (err) {
        context.res = {
            status: 400,
            body: { message: getErrorMessage(err) }
        }
    }
};

export default httpTrigger;

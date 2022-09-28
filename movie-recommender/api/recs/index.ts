import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const url = "https://corymcc-movie4.westcentralus.inference.ml.azure.com/score";
const api_key = "me0FL322gQVsGZjHM1SodZDsKp34BHvk";

type RatingsCollection = { [K in string]: number };

function isRatingsCollection(arg: any): arg is RatingsCollection {
    return Object.entries(arg).every(entry => typeof (entry[0]) === "string" && typeof (entry[1]) === "number");
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try {
        const ratings = JSON.parse(req.body || {})
        if(!isRatingsCollection(ratings)){
            throw new Error("Malformed data - supplied data is not a collection of movie ratings.");
        }
        context.res = await axios.get(url, {
            method: "GET",
            data: ratings,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ('Bearer ' + api_key),
                'azureml-model-deployment': 'cors-3'
            }
        });
    } catch(e){
        context.res = {
            status: 400,
            body: e
        }
    }
 };

export default httpTrigger;
import urllib.request
import logging
import logging
import azure.functions as func
import json


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    url = 'https://corymcc-movie4.westcentralus.inference.ml.azure.com/score'
    api_key = 'me0FL322gQVsGZjHM1SodZDsKp34BHvk' # need a better way to get API key - maybe akv
    headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key) } #, 'azureml-model-deployment': 'cors-4' }
    
    try:
        body=req.get_json()
        req_fwd = urllib.request.Request(url, bytes(json.dumps(body).encode('utf8')), headers)
        return func.HttpResponse(urllib.request.urlopen(req_fwd).read(), headers={"content-type": "application/json"})
    except ValueError:
        return func.HttpResponse("Unable to read data.", status_code=400, headers={"content-type": "application/json"})
    except urllib.error.HTTPError as error:
        logging.error("The request failed with status code: " + str(error.code))
        logging.error(error.info())
        logging.error(error.read().decode("utf8", 'ignore'))
        return func.HttpResponse(json.dumps(error.read()), status_code=400, headers={"content-type": "application/json"})
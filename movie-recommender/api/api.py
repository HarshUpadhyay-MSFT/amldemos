# from flask import Flask, request
# import urllib.request
# import logging
# import json

# app = Flask(__name__)

# @app.route("/api/fetchRecs", methods=['POST'])
# def post():
#     url = 'https://corymcc-movie4.westcentralus.inference.ml.azure.com/score'
#     api_key = 'me0FL322gQVsGZjHM1SodZDsKp34BHvk' # need a better way to get API key - maybe akv
#     headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key) } #, 'azureml-model-deployment': 'cors-4' }

#     body=request.get_json()
#     req = urllib.request.Request(url, bytes(json.dumps(body).encode('utf8')), headers)

#     try:
#         return urllib.request.urlopen(req).read()
#     except urllib.error.HTTPError as error:
#         logging.error("The request failed with status code: " + str(error.code))
#         logging.error(error.info())
#         logging.error(error.read().decode("utf8", 'ignore'))
#         return json.dumps(error.read()), 400

import axios from "axios";
import * as React from "react";
import { useQuery, UseQueryResult } from "react-query";

const url = "https://corymcc-movie4.westcentralus.inference.ml.azure.com/score";
const api_key = "me0FL322gQVsGZjHM1SodZDsKp34BHvk";

export const useFetchRecommendations = (ratings: { [K in string]: number }): UseQueryResult<Array<string>, any> => {
    const getRecommendations = React.useCallback(async () => {
        const response = await axios.get(url, {
            method: "GET",
            data: ratings,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ('Bearer ' + api_key),
                'azureml-model-deployment': 'cors-3'
            }
        });
        return response.data;
    }, [ratings]);

    return useQuery("movies", getRecommendations);
}
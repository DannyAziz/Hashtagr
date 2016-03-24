from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from aylienapiclient import textapi

client = textapi.Client("4e54529a", "c967161c974a83f30c0e9819e2219451")


@api_view()
def index(request):
    if request.method == "GET":
        url = request.query_params.get("url")
        print url
        hashtags = client.Hashtags({"url": url})
        return Response({"Hashtags": hashtags["hashtags"]})

from django.shortcuts import render
from django.shortcuts import render_to_response


def index(request):
    return render_to_response('animation/index.html', {})

def home(request):
    return render_to_response('animation/home.html', {})

def quotes(request):
    return render_to_response('animation/quotes.html', {})

def test(request):
    return render_to_response('animation/test.html', {})

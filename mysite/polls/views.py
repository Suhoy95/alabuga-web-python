from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse

from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {
        'latest_question_list': latest_question_list
    }

    # from django.template import loader
    # ...
    # template = loader.get_template('polls/index.html')
    # return HttpResponse(template.render(context, request))

    # shortcut
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    # from django.http.response import Http404
    # ...
    # try:
    #     question = Question.objects.get(pk=question_id)
    # except Question.DoesNotExist:
    #     raise Http404("Question is not exist")

    # shortcut
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})


def results(request, question_id):
    return HttpResponse("Question id %s results" % question_id)


def vote(request, question_id):
    return HttpResponse("Vote in Question %s" % question_id)

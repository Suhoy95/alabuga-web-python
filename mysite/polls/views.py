from django.http.response import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.urls import reverse
from django.db.models import F

from .models import Choice, Question

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
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': 'Вы не выбрали ответ'
        })
    else:
        # Используем F(), чтобы избежать Гонок, и обновление значения происходило на уровне Базы Данных
        # https://docs.djangoproject.com/en/3.2/ref/models/expressions/#f-expressions
        selected_choice.votes = F('votes') + 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(
            reverse('polls:results', args=(question.id,))
        )

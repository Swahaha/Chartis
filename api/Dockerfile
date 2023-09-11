FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip3 install -r /code/requirements.txt

COPY ./ /code

CMD python3 -m uvicorn main:app --reload --host 0.0.0.0
FROM python:3.7

WORKDIR /code
RUN pip install flask
RUN pip install flask_cors
RUN pip3 install pymysql
RUN pip install simplejson
RUN pip install cryptography
COPY backend/ .

CMD [ "python", "./main.py" ]
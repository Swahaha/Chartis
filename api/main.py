from fastapi import FastAPI
from routes.user import user
from pymongo import MongoClient
from pydantic import BaseModel
from insertmongo import insert
from routing import Graph


client = MongoClient("mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/")

db_names = client.list_database_names()
print(db_names)

app = FastAPI()
graph = Graph()


class Gorilla(BaseModel):
    lat: float
    lng: float
    type: str


class Chimp(BaseModel):
    lat: float
    lng: float
    lat2: float
    lng2: float


@app.get("/header")
async def fun():
    return "Hello World!"


@app.post('/gorilla')
async def turtle(query: Gorilla):
    insert(query.lat, query.lng, query.type)
    return query


@app.post('/chimp')
async def turt(query: Chimp):
    # set backend dest to query.lat, query.lng
    return graph.navigation(query.lng, query.lat, query.lng2, query.lat2)   # enter the x, y coordinates of both


@app.get('/dog')
async def frog():
    # set backend dest to query.lat, query.lng
    graph.keep_updated()
    return 'duuuude'

import pandas as pd

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


cred = credentials.Certificate("serviceAccountKey.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://mypro-d968a-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

# Define a function to calculate the Jaccard similarity coefficient between two sets
def jaccard_similarity(set1, set2):
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union

# Define a function to recommend friends for a given individual based on their interests
@app.get("/recommend_friends")
async def recommend_friends_endpoint(name : str,interests: str):
  
    ref = db.reference('users')
    firebase_data = ref.get()
    print(name)
    

    individuals = {}
    for user_id, data in firebase_data.items():
        # Assume that the user ID is the user's name
        
        if(user_id != name):
            name2 = user_id
            hobbies = data['hobbies']
            individuals[name2] = hobbies
    

    # Add the new user and their interests to the individuals dictionary
    individuals[name] = interests.split(",")

    print(individuals)
  


    # Convert the individuals dictionary to a Pandas DataFrame
    df = pd.DataFrame(list(individuals.items()), columns=['individual', 'interests'])
    df = df.explode('interests').reset_index(drop=True)

    # Create an empty list to store similarity scores
    similarities = []

    # Loop through each other individual and calculate their Jaccard similarity coefficient
    for other in df[df['individual']!=name]['individual'].unique():
        set1 = set(df[df['individual']==name]['interests'])
        set2 = set(df[df['individual']==other]['interests'])
        similarity = jaccard_similarity(set1, set2)
        similarities.append((other, similarity))

    # Sort the list of similarity scores in descending order
    similarities.sort(key=lambda x: x[1], reverse=True)

    # Return the top individual with the highest similarity score
    print(similarities,"similarities")
    userid = similarities[0][0]
    print(userid)
    ref = db.reference('users/'+userid+'/userData/firstName')
    firebase_data = ref.get()
    print(firebase_data)
    return firebase_data






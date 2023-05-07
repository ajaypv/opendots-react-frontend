# Import necessary libraries
import pandas as pd

# Define a function to calculate the Jaccard similarity coefficient between two sets
def jaccard_similarity(set1, set2):
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union

# Define a function to recommend friends for a given individual based on their interests
def recommend_friends(name, interests):
    # Define a list of individuals and their interests
    individuals = {
        'Alice': ['reading', 'cooking', 'hiking', 'music'],
        'Bob': ['reading', 'music', 'traveling'],
        'Charlie': ['hiking', 'music'],
        'David': ['music', 'sports', 'traveling'],
        'Emma': ['reading', 'cooking', 'hiking']
    }

    # Add the new user and their interests to the individuals dictionary
    individuals[name] = interests

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
    print(similarities)

    # Return the top individual with the highest similarity score
    return similarities[0][0]

# Test the function with sample input
name = input("Enter your name: ")
interests = input("Enter your interests separated by commas: ").split(",")
recommendation = recommend_friends(name, interests)
print(f"Recommended friend for {name}: {recommendation}")

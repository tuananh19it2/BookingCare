from flask import Flask, render_template, request, jsonify
from chat import get_response
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

def read_csv_from_google_drive(url):
    reconstructed_url = 'https://drive.google.com/uc?id=' + url.split('/')[-2]
    df = pd.read_excel(reconstructed_url)
    return df

@app.get("/")
def index_get():
    return jsonify("chào")

@app.post("/predict")
def predict():
    text = request.get_json().get("message")

    # TODO: check if text is valid
    response = get_response(text)
    message = {"answer": response}

    return jsonify(message)

@app.route('/api/recommend_doctor', methods=['POST'])
def get_recommendation():
    data = request.get_json()
    _id = data['_id']
    recommended_courses = recommend_favourite(_id)
    return jsonify(recommended_courses.to_dict('records'))

# Load dataframes
doctor_df = pd.read_excel("C:/Users/ADMIN/Downloads/doctors.xlsx")
favorite_df = pd.read_excel("C:/Users/ADMIN/Downloads/patients.xlsx")


def similarity(text, keyword):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([text, keyword])
    similarity_score = cosine_similarity(vectors)[0, 1]
    return similarity_score

def address_similarity(address1, address2):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([address1, address2])
    similarity_score = cosine_similarity(vectors)[0, 1]
    return similarity_score

def recommend_favourite(_id):
    user_info = favorite_df.loc[favorite_df['ID'] == _id, ['NameSpecialty', 'Address']].iloc[0]

    relevant_product_interests = pd.DataFrame(
        columns=['ID', 'LastName', 'FirstName', 'Address', 'Clinic', 'Specialty', 'Image'])

    for interest in user_info['NameSpecialty'].split(','):
        products = doctor_df.loc[doctor_df['Specialty'] == interest.strip()]
        similarity_scores = products['Specialty'].apply(lambda x: similarity(x, interest.strip()))
        products = products.assign(similarity_score=similarity_scores)

        # Thêm độ tương đồng của địa chỉ
        products['address_similarity'] = products['Address'].apply(lambda x: address_similarity(x, user_info['Address']))

        relevant_product_interests = pd.concat([relevant_product_interests, products], ignore_index=True)

    relevant_product_local = doctor_df.loc[doctor_df['Specialty'] == user_info['NameSpecialty']]
    relevant_product_purchase_history = doctor_df.loc[doctor_df['Specialty'] == user_info['NameSpecialty']]

    relevant_product = pd.concat(
        [relevant_product_interests, relevant_product_local, relevant_product_purchase_history], ignore_index=True)

    # Sắp xếp theo độ tương đồng giảm dần theo Specialty và sau đó theo Address
    relevant_product = relevant_product.sort_values(by=['similarity_score', 'address_similarity'], ascending=[False, False]).head(4)

    return relevant_product[['ID', 'LastName', 'FirstName', 'Address', 'Clinic', 'Specialty', 'Image']]




if __name__ == "__main__":
    app.run(debug=True)


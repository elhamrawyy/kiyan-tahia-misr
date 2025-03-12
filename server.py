from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from google.oauth2.service_account import Credentials

app = Flask(__name__)
CORS(app)

# إعداد Google Sheets API
creds = Credentials.from_service_account_file("credentials.json")
client = gspread.authorize(creds)

# فتح ملف Google Sheets باستخدام الرابط
spreadsheet = client.open_by_url("https://docs.google.com/spreadsheets/d/1vrtf2TcsFvWWSi0Iksb9Fw1FQTvpceuy/edit?gid=118831133")
sheet = spreadsheet.sheet1  # الورقة الأولى

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    
    # حفظ البيانات في Google Sheets
    sheet.append_row([data["name"], data["email"], data["q1"], data["q2"]])
    
    return jsonify({"message": "تم استلام الإجابات بنجاح!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

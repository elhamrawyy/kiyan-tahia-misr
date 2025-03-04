from flask import Flask, request, jsonify
from flask_cors import CORS
import openpyxl

app = Flask(__name__)
CORS(app)  # السماح للـ HTML بالتواصل مع السيرفر

# تحميل أو إنشاء ملف Excel لحفظ الإجابات
file_name = "contest_answers.xlsx"
try:
    workbook = openpyxl.load_workbook(file_name)
    sheet = workbook.active
except FileNotFoundError:
    workbook = openpyxl.Workbook()
    sheet = workbook.active
    sheet.append(["الاسم", "البريد الإلكتروني", "إجابة 1", "إجابة 2"])
    workbook.save(file_name)

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json  # استقبال البيانات من الموقع
    
    # حفظ البيانات في Excel
    sheet.append([data["name"], data["email"], data["q1"], data["q2"]])
    workbook.save(file_name)

    return jsonify({"message": "تم استلام الإجابات بنجاح!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
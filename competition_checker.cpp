#include <iostream>
#include <vector>
#include <string>
using namespace std;

// دالة للتحقق من الإجابات الصحيحة
bool checkAnswer(int questionNumber, const string& userAnswer) {
    vector<pair<int, string>> correctAnswers = {
        {1, "مرة واحدة"},
        {2, "السنة الثانية للهجرة"},
        {3, "مسجد قباء"},
        {4, "عبدالله بن مسعود"},
        {5, "سورة الإخلاص"},
        {6, "يونس عليه السلام"},
        {7, "سبع آيات"},
        {8, "أبو بكر الصديق"},
        {9, "سورة البقرة"},
        {10, "ركعتان"},
        {11, "ليلة القدر"},
        {12, "اللهم إنك عفو تحب العفو فاعف عني"},
        {13, "تسع سنوات"},
        {14, "التاسع"},
        {15, "تمر وماء"}
    };

    for (const auto& qa : correctAnswers) {
        if (qa.first == questionNumber) {
            return qa.second == userAnswer;
        }
    }
    return false;
}

int main() {
    cout << "اختبار الأسئلة الرمضانية" << endl;
    int score = 0;
    
    for (int i = 1; i <= 15; ++i) {
        string userAnswer;
        cout << "أدخل إجابة السؤال " << i << ": ";
        getline(cin, userAnswer);
        
        if (checkAnswer(i, userAnswer)) {
            cout << "إجابة صحيحة!" << endl;
            score++;
        } else {
            cout << "إجابة خاطئة." << endl;
        }
    }
    
    cout << "لقد حصلت على " << score << " من 15." << endl;
    return 0;
}
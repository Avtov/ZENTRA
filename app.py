from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

# Токен и ID чата Telegram
TELEGRAM_TOKEN = "8212810999:AAF-SenYZBwKshklzUJyw71npv3-9qAQ3II"
TELEGRAM_CHAT_ID = "883889967"

def send_telegram_message(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }
    try:
        response = requests.post(url, data=payload)
        print(response.status_code, response.text)
    except Exception as e:
        print("Ошибка отправки Telegram:", e)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/contacts")
def contacts():
    return render_template("contacts.html")

@app.route("/services")
def services():
    return render_template("services.html")

# Обработка формы
@app.route("/submit_form", methods=["POST"])
def submit_form():
    name = request.form.get("name")
    contact = request.form.get("contact")
    wishes = request.form.get("wishes")

    if name and contact:
        message = f"<b>Новая заявка с сайта ZENTRA</b>\n\n" \
                  f"<b>Имя:</b> {name}\n" \
                  f"<b>Контакт:</b> {contact}\n" \
                  f"<b>Пожелания:</b> {wishes}"
        send_telegram_message(message)
        return "OK", 200
    else:
        return "Ошибка: заполните все поля", 400

if __name__ == "__main__":
    app.run()

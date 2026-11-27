from flask import Flask,render_template,redirect,session,request
from dotenv import load_dotenv
import os

load_dotenv('../.env')

app = Flask(__name__)
app.secret_key = os.environ('SECRET_KEY')

@app.route('/')
def home():
    if not session:
        return redirect('/login?action_redirector=/')
    return render_template('index.html')

@app.route('/login')
def login():
    if session:
        return redirect('/')
    action_redirector = request.args.get('action_redirector', '/')
    return render_template('user/login.html',action_redirector=action_redirector)

if __name__ == '__main__':
    app.run(debug=True)

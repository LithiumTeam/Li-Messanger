from flask import Blueprint,request,redirect,flash,session,jsonify
import smtplib, random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

apiBlueprint = Blueprint('api', __name__)

@apiBlueprint.route('/login/send-otp', methods=['POST'])
def apiLogin():
    if session:
        return redirect('/')
    email = request.form.get('email','')
    if email == '':
        flash('ایمیل نامعتبر','error')
        return redirect('/login')
    try:
        with open('../../data.txt') as file:
            data = file.readlines()
            senderEmail,appPassword = data[0],data[1]
        code = random.randint(1000,9999)
        msg = MIMEMultipart()
        msg['From'] = senderEmail
        msg['To'] = email
        msg['Subject'] = "Li-Messanger Login"

        body = f"سلام! شما برای لاگین به پیام رسان Li-Messanger درخواست داده اید.\nکد ورود شما : {code}"

        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(senderEmail, appPassword)
            server.send_message(msg)
        session['login_code'] = code
        return jsonify({
            'success':True,
            'message':'کد با موفقیت به ایمیل شما ارسال شد.'
        })
    except:
        return jsonify({
            'success':False,
            'message':'خطا در ارسال ایمیل.'
        })

from flask import Flask, render_template

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT']  = 0
app.config.update()


@app.route('/')
def start():
    return render_template('index.html')

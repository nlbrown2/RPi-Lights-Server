from flask import Flask, render_template, request
from flask_webpack import Webpack
import ssl

webpack = Webpack()

app = Flask(__name__)
params = {
        'DEBUG': True,
        'WEBPACK_MANIFEST_PATH': app.root_path + '/build/manifest.json',
        'WEBPACK_ASSETS_URL': '/static/'
        }

app.config.update( params )

webpack.init_app(app)
context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.load_cert_chain(app.root_path + '/security/ssl.cert', app.root_path + '/security/ssl.key')


@app.route('/')
def start():
    return render_template('index.html')

@app.route('/signedIn')
def signedIn():
    print("Sign in success!")
    return render_template('signedIn.html')

@app.route('/test')
def testRequest():
    print("Got a request")
    print(request.headers)
    return 'hi'

app.run(host='127.0.0.1')

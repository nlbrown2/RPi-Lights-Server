from flask import Flask, render_template
from flask_webpack import Webpack

webpack = Webpack()

app = Flask(__name__)
params = {
        'DEBUG': True,
        'WEBPACK_MANIFEST_PATH': app.root_path + '/build/manifest.json',
        'WEBPACK_ASSETS_URL': '/static/'
        }

app.config.update( params )

webpack.init_app(app)


@app.route('/')
def start():
    print(app.root_path + 'src/')
    return render_template('index.html')

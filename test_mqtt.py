from paho.mqtt.client import Client

client = Client()
client.username_pw_set('RpiLights', '649t15Db#@4Z')
client.enable_logger()

def topic_callback(client, userdata, message):
    print('topic_callback', message)
    if message.payload.decode('utf-8') == 'on':
        client.publish('topic2', payload='off')

def on_connect(client, userdata, flags, rc):
    print("Connected")
    client.subscribe('topic1')

client.message_callback_add('topic1', topic_callback)
client.on_connect = on_connect

client.connect('cloud.iot-playground.com', port=10048)
print(str(client))

client.subscribe('topic1')
client.publish('topic2', payload=1)

client.loop_forever()

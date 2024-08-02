from flask import Flask, request, jsonify
import time
import random

app = Flask(__name__)

@app.route('/api/send-messages', methods=['POST'])
def send_messages():
    data = request.json
    phone_number = data['phone_number']
    recipient_number = data['recipient_number']
    delay = data['delay']
    messages = data['messages']

    # Simulate generating a pairing code
    pairing_code = str(random.randint(100000, 999999))
    
    # Save messages to a temporary location (For demonstration purposes)
    with open('temp_messages.txt', 'w') as f:
        for message in messages:
            f.write(message + '\n')

    # This is where you would connect to WhatsApp and send messages
    # For example, you might use Selenium or a similar tool here

    # Simulate sending messages with delay
    time.sleep(delay / 1000)
    
    return jsonify({'pairing_code': pairing_code})

if __name__ == '__main__':
    app.run(port=5000)

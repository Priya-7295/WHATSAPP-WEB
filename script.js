document.getElementById('message-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phone_number').value;
    const recipientNumber = document.getElementById('recipient_number').value;
    const delay = parseInt(document.getElementById('delay').value) * 1000;
    const messageFile = document.getElementById('message_file').files[0];
    
    if (!phoneNumber || !recipientNumber || !messageFile) {
        document.getElementById('status').innerText = "Please fill all fields and select a file.";
        return;
    }

    const fileContent = await readFileContent(messageFile);
    const data = {
        phone_number: phoneNumber,
        recipient_number: recipientNumber,
        delay: delay,
        messages: fileContent.split('\n')
    };

    try {
        const response = await fetch('/api/send-messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            document.getElementById('status').innerText = `Pairing Code: ${result.pairing_code}`;
        } else {
            document.getElementById('status').innerText = "Failed to process request.";
        }
    } catch (error) {
        document.getElementById('status').innerText = `Error: ${error.message}`;
    }
});

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

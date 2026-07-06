function sendMessage() {

    const input = document.getElementById("userInput");

    const chatBox = document.getElementById("chatBox");

    const question = input.value.trim();

    if(question==="") return;

    // Papar mesej pengguna

    chatBox.innerHTML += `
    <div class="user-message">
        👤 ${question}
    </div>
    `;

    // Cari jawapan

    const result = findAnswer(question);

    // Papar jawapan AI

    chatBox.innerHTML += `
    <div class="ai-message">
        🤖<br><br>
        ${result.answer}
    </div>
    `;

    // Scroll ke bawah

    chatBox.scrollTop = chatBox.scrollHeight;

    input.value="";
}

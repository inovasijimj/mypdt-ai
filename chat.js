function replyAI() {

    const question = document.getElementById("question").value.trim();

    if(question===""){
        return;
    }

    const result = findAnswer(question);

    document.getElementById("answer").innerHTML = `
    <div style="background:#eef7ff;
                padding:15px;
                border-left:5px solid #0b5ed7;
                border-radius:8px;">

        🤖 <b>MyPDT Smart AI</b><br><br>

        ${result.answer}

    </div>
    `;

    document.getElementById("question").value="";
}

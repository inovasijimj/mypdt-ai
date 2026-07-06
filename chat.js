function replyAI(){

    const question=document.getElementById("question").value.trim();
    document.getElementById("answer").innerHTML = `
    <div style="
    background:#f5f7fb;
    padding:18px;
    border-radius:12px;
    border-left:5px solid #0b5ed7;
    font-weight:bold;
    ">
    🤖 MyPDT AI sedang mencari jawapan...
    </div>
    `;
    if(question=="") return;

    document.getElementById("answer").innerHTML=`
    <div style="padding:15px;">
    🤖 AI sedang berfikir...
    </div>
    `;

    setTimeout(function(){

        const result=findAnswer(question);

        document.getElementById("answer").innerHTML=`
        <div style="
        background:#eef7ff;
        border-left:5px solid #0b5ed7;
        padding:15px;
        border-radius:8px;">

        🤖 <b>${result.title}</b><br><br>

        ${result.answer}

        </div>
        `;

    },1000);

    document.getElementById("question").value="";
}

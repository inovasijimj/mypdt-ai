function replyAI(){

    const question=document.getElementById("question").value.trim();

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

    },700);

    document.getElementById("question").value="";
}

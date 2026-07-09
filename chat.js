// ==========================================================
// MyPDT SMART AI ASSISTANT
// RESPONSE ENGINE v2.0
// ==========================================================

function replyMyPDT() {

    // Ambil soalan daripada textarea
    const questionBox = document.getElementById("question");
    const answerBox = document.getElementById("answer");

    const question = questionBox.value.trim();


    // ======================================================
    // 1. SEMAK JIKA SOALAN KOSONG
    // ======================================================

    if (question === "") {

        answerBox.innerHTML = `
            <div style="
                background:#fff8e6;
                border-left:5px solid #f59e0b;
                padding:18px;
                border-radius:10px;
            ">
                <b>🤖 MyPDT Smart AI</b><br><br>
                Sila taip soalan anda terlebih dahulu.
            </div>
        `;

        return;
    }


    // ======================================================
    // 2. PAPARKAN STATUS ANALISIS AI
    // ======================================================

    answerBox.innerHTML = `
        <div style="
            background:#eef7ff;
            border-left:5px solid #0b5ed7;
            padding:18px;
            border-radius:10px;
        ">
            <b>🤖 MyPDT AI sedang menganalisis soalan anda...</b><br><br>
            🔍 Mencari maklumat dalam Knowledge Base...
        </div>
    `;


    // ======================================================
    // 3. HANTAR SOALAN KEPADA MATCHING ENGINE
    // ======================================================

    setTimeout(function () {

        try {

            const result = findAnswer(question);


            // ==================================================
            // 4. FORMAT JAWAPAN
            // ==================================================

            const formattedAnswer = String(result?.answer || "")
    .trim()
    .replace(/\n/g, "<br>");


            // ==================================================
            // 5. PAPARKAN JAWAPAN AI
            // ==================================================

            answerBox.innerHTML = `
                <div style="
                    background:#eef7ff;
                    border-left:5px solid #0b5ed7;
                    padding:20px;
                    border-radius:10px;
                    line-height:1.7;
                ">

                    <div style="
                        font-size:18px;
                        font-weight:bold;
                        color:#0b3768;
                        margin-bottom:15px;
                    ">
                        ${result.title}
                    </div>

                    <div>
                        ${formattedAnswer}
                    </div>

                </div>
            `;


            // ==================================================
            // 6. PAPAR MAKLUMAT ENJIN AI
            // Sesuai untuk demonstrasi kepada juri
            // ==================================================

            console.log("===== MyPDT AI Analysis =====");
            console.log("Soalan:", question);
            console.log("Topik:", result.title);
            console.log("Skor Padanan:", result.score || 0);
            console.log(
                "Kata Kunci Dipadankan:",
                result.matchedKeywords || []
            );
            console.log(
                "Sumber Jawapan:",
                result.source || "Knowledge Base"
            );


        } catch (error) {

            console.error("MyPDT AI Error:", error);

            answerBox.innerHTML = `
                <div style="
                    background:#fff1f2;
                    border-left:5px solid #dc2626;
                    padding:18px;
                    border-radius:10px;
                ">
                    <b>⚠️ MyPDT Smart AI</b><br><br>
                    Maaf, berlaku ralat: ${error.message}
                </div>
            `;
        }

    }, 800);


    // ======================================================
    // 7. KOSONGKAN TEXTAREA SELEPAS SOALAN DIHANTAR
    // ======================================================

    questionBox.value = "";
}

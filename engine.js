// ==========================================================
// MyPDT SMART AI ASSISTANT
// MATCHING ENGINE v2.0
// ==========================================================


// ==========================================================
// 1. NORMALISASI SOALAN PENGGUNA
// ==========================================================

function normalizeText(text) {

    text = text.toLowerCase().trim();

    // Buang tanda baca
    text = text.replace(/[.,?!;:]/g, " ");

    // Betulkan ruang berlebihan
    text = text.replace(/\s+/g, " ");

    // Bahasa ringkas / singkatan biasa
    const replacements = {

        "xleh": "tak boleh",
        "takleh": "tak boleh",
        "x boleh": "tak boleh",

        "sy": "saya",
        "sya": "saya",

        "nk": "nak",
        "dkt": "dekat",
        "pls": "tolong",

        "paspot": "pasport",
        "passport": "pasport",

        "booking": "tempahan",
        "book": "tempahan",

        "walk in": "walk-in",
        "walkin": "walk-in",

        "drive in": "drive-in",
        "drivein": "drive-in",

        "orang tua": "warga emas",

        "disabled": "oku",
        "cacat": "oku",

        "mengandung": "wanita hamil",

        "ic": "mykad"
    };


    for (const phrase in replacements) {

        const regex = new RegExp(
            "\\b" + phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b",
            "gi"
        );

        text = text.replace(regex, replacements[phrase]);
    }


    return text.trim();
}



// ==========================================================
// 2. KIRA SKOR PADANAN KEYWORD
// ==========================================================

function calculateScore(question, item) {

    let score = 0;

    const matchedKeywords = [];


    for (const keyword of item.keywords) {

        const normalizedKeyword = normalizeText(keyword);


        if (question.includes(normalizedKeyword)) {

            const wordCount =
                normalizedKeyword.split(/\s+/).length;


            // Frasa panjang mendapat skor lebih tinggi
            if (wordCount >= 4) {

                score += 12;

            } else if (wordCount === 3) {

                score += 9;

            } else if (wordCount === 2) {

                score += 6;

            } else {

                score += 3;
            }


            matchedKeywords.push(keyword);
        }
    }


    return {

        score: score,

        matchedKeywords: matchedKeywords
    };
}



// ==========================================================
// 3. PENGESAN UMUR DINAMIK
// Contoh:
// "Saya umur 61 tahun, layak tak?"
// ==========================================================

function detectAge(question) {

    const ageMatch = question.match(
        /(?:umur|usia)?\s*(\d{1,3})\s*(?:tahun)?/
    );


    if (!ageMatch) {

        return null;
    }


    const age = parseInt(ageMatch[1]);


    if (age < 0 || age > 120) {

        return null;
    }


    return age;
}



// ==========================================================
// 4. RESPONS KHAS BERDASARKAN UMUR
// ==========================================================

function generateAgeResponse(question) {

    const age = detectAge(question);


    if (age === null) {

        return null;
    }


    const ageContext = [

        "umur",
        "usia",
        "tahun",
        "warga emas",
        "layak",
        "boleh guna",
        "boleh tak",
        "boleh ke"

    ];


    const hasAgeContext = ageContext.some(
        keyword => question.includes(keyword)
    );


    if (!hasAgeContext) {

        return null;
    }


    if (age >= 60) {

        return {

            title: "👴 Semakan Kelayakan Warga Emas",

            answer: `
✅ Ya. Individu berumur ${age} tahun layak menggunakan perkhidmatan MyPDT di bawah kategori Warga Emas kerana telah berumur 60 tahun atau ke atas.

Sila pastikan dokumen yang diperlukan dibawa semasa hadir untuk pengambilan pasport.
            `,

            score: 100,

            source: "Dynamic Age Reasoning"

        };

    }


    return {

        title: "👤 Semakan Kelayakan Berdasarkan Umur",

        answer: `
Berdasarkan umur ${age} tahun, individu tersebut belum termasuk dalam kategori Warga Emas MyPDT yang ditetapkan pada umur 60 tahun dan ke atas.

Walau bagaimanapun, individu tersebut masih boleh layak sekiranya tergolong dalam kategori lain:

✅ Pemohon Online

✅ Orang Kelainan Upaya (OKU)

✅ Wanita Hamil

✅ VIP
        `,

        score: 100,

        source: "Dynamic Age Reasoning"

    };
}



// ==========================================================
// 5. MATCHING ENGINE UTAMA
// ==========================================================

function findAnswer(question) {

    const text = normalizeText(question);
    const isEnglish = /\b(who|what|where|when|why|how|can|is|are|do|does|eligible|document|documents|time|location|booking|appointment|passport|drive|walk)\b/i.test(question);


    // Soalan kosong
    if (!text) {

        return {

            title: "🤖 MyPDT Smart AI",

            answer: `
Sila taip soalan anda terlebih dahulu.

Contoh:

* Siapa yang layak menggunakan MyPDT?

* Dokumen apa yang perlu dibawa?

* Saya berumur 65 tahun. Adakah saya layak?

* Perlukah saya membuat tempahan untuk Drive-In?
            `,

            score: 0,

            source: "System"

        };
    }



    // ======================================================
    // 6. SEMAK RESPONS UMUR DINAMIK
    // ======================================================

    const ageResponse = generateAgeResponse(text);


    if (ageResponse) {

        return ageResponse;
    }



    // ======================================================
    // 7. CARI DAN KIRA SEMUA PADANAN
    // ======================================================

    const matches = [];


    for (const key in knowledge) {

        const item = knowledge[key];

        const result = calculateScore(text, item);


        if (result.score > 0) {

            matches.push({
                key: key,
                title: item.title,
                answer: isEnglish && item.answer_en ? item.answer_en : item.answer,
                score: result.score,
                matchedKeywords: result.matchedKeywords,
                source: "Knowledge Base"
            });
        }
    }



    // ======================================================
    // 8. TIADA PADANAN
    // ======================================================

    if (matches.length === 0) {

        return {

            title: "🤖 MyPDT Smart AI",

            answer: `
Maaf, saya belum mempunyai jawapan khusus untuk soalan tersebut.

Saya boleh membantu anda mengenai:

👥 Kelayakan MyPDT

📄 Dokumen yang diperlukan

🕒 Waktu operasi

🚗 Drive-In

🚶 Walk-In

📅 Tempahan slot

📍 Lokasi MyPDT

⏱️ Tempoh proses

☎️ Maklumat untuk dihubungi

Sila cuba tanya menggunakan ayat yang lebih khusus.
            `,

            score: 0,

            source: "Fallback Response"

        };
    }



    // ======================================================
    // 9. SUSUN PADANAN MENGIKUT SKOR TERTINGGI
    // ======================================================

    matches.sort(
        (a, b) => b.score - a.score
    );


    const bestMatch = matches[0];



    // ======================================================
    // 10. MULTI-TOPIC RESPONSE
    // Hanya gabungkan topik yang mempunyai skor kukuh
    // ======================================================

    const strongMatches = matches.filter(
        item =>
            item.score >= 6 &&
            item.score >= bestMatch.score * 0.7
    );


    if (strongMatches.length > 1) {

        const selectedMatches =
            strongMatches.slice(0, 3);


        return {

            title: selectedMatches
                .map(item => item.title)
                .join(" • "),

            answer: selectedMatches
                .map(item => item.answer)
                .join("<hr>"),

            score: bestMatch.score,

            matchedKeywords: selectedMatches
                .flatMap(item => item.matchedKeywords),

            source: "Multi-Topic Matching Engine"

        };
    }



    // ======================================================
    // 11. PULANGKAN JAWAPAN TERBAIK
    // ======================================================

    return bestMatch;
}

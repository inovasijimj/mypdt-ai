function findAnswer(question){

    let q = question.toLowerCase().trim();
    // =========================
// Normalisasi ayat pengguna
// =========================

let text = q;

// Buang tanda baca
text = text.replace(/[.,?!]/g,"");

// Singkatan biasa
text = text.replace(/xleh/g,"tak boleh");
text = text.replace(/takleh/g,"tak boleh");
text = text.replace(/sy/g,"saya");
text = text.replace(/sya/g,"saya");
text = text.replace(/nk/g,"nak");
text = text.replace(/dkt/g,"dekat");
text = text.replace(/pls/g,"tolong");

// Passport
text = text.replace(/paspot/g,"passport");
text = text.replace(/pasport/g,"passport");

// Booking
text = text.replace(/booking/g,"tempahan");
text = text.replace(/book/g,"tempahan");

// Walk In
text = text.replace(/walk in/g,"walkin");
text = text.replace(/drive in/g,"drivein");

// Warga emas
text = text.replace(/orang tua/g,"warga emas");

// OKU
text = text.replace(/disabled/g,"oku");
text = text.replace(/cacat/g,"oku");

// Hamil
text = text.replace(/mengandung/g,"wanita hamil");
// Salam
if(text.includes("assalamualaikum") || q=="salam"){

    return{
        title:"Salam",
        answer:`
Waalaikumussalam 😊

Selamat datang ke MyPDT Smart AI.

Saya boleh membantu anda berkaitan:

* Kelayakan
* Dokumen
* Waktu Operasi
* Tempahan Slot
* Drive-In
* Walk-In
* Hubungi Kami

Sila taip soalan anda.
`
    };

}

// Hello
if(text.includes("hello") || text.includes("hai") || text.includes("hi")){

    return{
        title:"Hello",
        answer:`
Hai 😊

Saya ialah MyPDT Smart AI.

Apa yang ingin anda ketahui mengenai MyPassport Drive-In & Take?
`
    };

}

// Terima kasih
if(text.includes("terima kasih") || text.includes("thanks")){

    return{
        title:"Sama-sama",
        answer:`
😊 Sama-sama.

Semoga urusan anda dipermudahkan.

Jika ada soalan lain mengenai MyPDT, sila tanya saya.
`
    };

}
   if(text.includes("orang tua")){
    text+=" warga emas";
}

if(text.includes("oku")){
    text+=" orang kurang upaya";
}

if(text.includes("mengandung")){
    text+=" wanita hamil";
}

if(text.includes("booking")){
    text+=" tempahan";
}

if(text.includes("book")){
    text+=" tempahan";
}
    // ==========================
// Multi Topik
// ==========================

let responses = [];
let titles=[];
let scores={};
for(const key in knowledge){

    const item = knowledge[key];

    for(const keyword of item.keywords){

        if(text.includes(keyword.toLowerCase())){

            if(!responses.includes(item.answer)){
                responses.push(item.answer);
                scores[item.title] = (scores[item.title] || 0) + 1;

if(!titles.includes(item.title)){
    titles.push(item.title);
}

            break;
        }

    }

}

if(responses.length>1){
titles.sort((a,b)=>(scores[b]||0)-(scores[a]||0));
    return{

title:titles.join(" • "),

answer:responses.join("<hr>")
};

}
    for(const key in knowledge){

        const item = knowledge[key];

        for(const keyword of item.keywords){

            if(text.includes(keyword.toLowerCase())){

                return item;

            }

        }

    }

    return{
        title:"Tidak Dijumpai",
        answer:`
❌ Maaf, saya tidak menemui jawapan untuk soalan tersebut.

Sila cuba gunakan kata seperti:

* layak
* dokumen
* waktu operasi
* tempahan
* QR
* Drive-In
* Walk-In
* MyKad
* Pasport
`
    };

}

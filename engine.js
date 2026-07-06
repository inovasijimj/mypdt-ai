function findAnswer(question){

    const q = question.toLowerCase().trim();
// Salam
if(q.includes("assalamualaikum") || q=="salam"){

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
if(q.includes("hello") || q.includes("hai") || q.includes("hi")){

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
if(q.includes("terima kasih") || q.includes("thanks")){

    return{
        title:"Sama-sama",
        answer:`
😊 Sama-sama.

Semoga urusan anda dipermudahkan.

Jika ada soalan lain mengenai MyPDT, sila tanya saya.
`
    };

}
   if(q.includes("orang tua")){
    q+=" warga emas";
}

if(q.includes("oku")){
    q+=" orang kurang upaya";
}

if(q.includes("mengandung")){
    q+=" wanita hamil";
}

if(q.includes("booking")){
    q+=" tempahan";
}

if(q.includes("book")){
    q+=" tempahan";
}
    
    for(const key in knowledge){

        const item = knowledge[key];

        for(const keyword of item.keywords){

            if(q.includes(keyword.toLowerCase())){

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

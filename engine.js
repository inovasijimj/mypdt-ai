function findAnswer(question){

    const q = question.toLowerCase().trim();

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

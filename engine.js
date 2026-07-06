function findAnswer(question) {

    // Tukar kepada huruf kecil
    question = question.toLowerCase();

    // Buang ruang berlebihan
    question = question.trim();

    // Semak semua kategori dalam knowledge
    for (const category in knowledge) {

        const item = knowledge[category];

        // Semak semua keyword dalam kategori
        for (const keyword of item.keywords) {

            if (question.includes(keyword.toLowerCase())) {

                return {
                    found: true,
                    category: category,
                    title: item.title,
                    answer: item.answer
                };

            }

        }

    }

    // Jika tiada padanan
    return {
        found: false,
        title: "Luar Skop",
        answer:
`Maaf.

Saya hanya membantu berkaitan
MyPassport Drive-In & Take (MyPDT),
perkhidmatan pasport
dan maklumat yang berkaitan.`
    };

}

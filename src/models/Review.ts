export default interface Review {
    "review_id": number,
    "user": {
        "userId": string,
        "user_pw": string,
        "user_name": string,
        "department": string,
        "quiz_lv": number,
        "point": {
            "point_id": number,
            "languageP": number,
            "productionP": number,
            "financeP": number,
            "marketingP": number,
            "itP": number
        }
    },
    "title": string,
    "content": string,
    "likeCnt": number,
    "createdAt": Date,
}
